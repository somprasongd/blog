---
title: จัดลำดับการ start services ใน docker-compose
date: '2022-08-26'
tags: ['docker-compose']
draft: false
summary: 'ใช้ depends_on มาจัดการลำดับการ start services'
---

# จัดลำดับการ start services ใน docker-compose

เวลาเราใช้ docker-compose เป็นตัวจัดการการรัน docker container ถ้ามีหลายๆ services ตัว docker-compose จะทำการ start ทุกๆ services ขึ้นมาพร้อมๆ กันหมดเลย และมีลำดับการ start แบบสุ่ม

แล้วถ้าเราอยากกำหนดลำดับการ start services หล่ะ จะทำยังไง ซึ่งใน docker-compose เราจะใช้ `depends_on` เป็นตัวกำหนดลำดับนั่นเอง

## การใช้งาน depends_on

เราสามารถเพิ่ม `depends_on` เข้าไปใน service ที่ต้องการรอ เพื่อบอกว่าต้องรอ services อะไรบ้าง โดยในบทความนี้จะใช้ตัวอย่างการรัน Kong API Gateway ซึ่งจะมีการใช้งาน Database PostgreSQL ซึ่งตัวมันจะมีการเชื่อมต่อไปยัง database ตอนเริ่มต้นการทำงาน ดังนั้น จะต้องตัว Kong จะต้อง start หลังจาก PostgreSQL start แล้ว เราสามารถกำหนดได้แบบนี้

```yaml:docker-compose.yml
version: '3.8'
services:
  kong-database:
    image: postgres:9.6-alpine
    restart: always
    ports:
      - '5432:5432'
    environment:
      - TZ=Asia/Bangkok
      - PGTZ=Asia/Bangkok
      - POSTGRES_USER=kong
      - POSTGRES_PASSWORD=kongpass
      - POSTGRES_DB=kong
    volumes:
      - pg-data:/var/lib/postgresql/data

  kong-migrate:
    image: kong/kong-gateway:2.8.1.4-alpine
    environment:
      - KONG_DATABASE=postgres
      - KONG_PG_HOST=kong-database
      - KONG_PG_USER=kong
      - KONG_PG_PASSWORD=kongpass
    command: 'kong migrations bootstrap'
    depends_on:
      - kong-database:

  kong-gateway:
    image: kong/kong-gateway:2.8.1.4-alpine
    environment:
      - KONG_DATABASE=postgres
      - KONG_PG_HOST=kong-database
      - KONG_PG_USER=kong
      - KONG_PG_PASSWORD=kongpass
      - KONG_PROXY_ACCESS_LOG=/dev/stdout
      - KONG_ADMIN_ACCESS_LOG=/dev/stdout
      - KONG_PROXY_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl
      - KONG_ADMIN_GUI_URL=http://localhost:8002
    ports:
      - 8000:8000
      - 8443:8443
      - 8001:8001
      - 8444:8444
      - 8002:8002
      - 8445:8445
      - 8003:8003
      - 8004:8004
    depends_on:
      - kong-database:

  konga:
    image: pantsel/konga
    environment:
      - NODE_ENV=development
      - TOKEN_SECRET=konga_token_secret
    ports:
      - 1337:1337

volumes:
  pg-data:
```

เมื่อสั่งรัน `docker-compose up` จะเห็นว่า services ของ kong นั้นได้เริ่ม start หลังจาก postgres แล้ว

```bash
docker-compose up
Creating network "kong_default" with the default driver
Creating volume "kong_pg-data" with default driver
Creating kong_konga_1         ... done
Creating kong_kong-database_1 ... done
Creating kong_kong-gateway_1  ... done
Creating kong_kong-migrate_1  ... done
```

แต่จะพบว่าทั้ง kong-migrate และ kong-gateway จะมี error ไม่สามารถทำงานได้เนื่องจาก service kong-database นั้นยังไม่พร้อมใช้งานนั้นเอง

```bash
kong-migrate_1   | Error: [PostgreSQL error] failed to retrieve PostgreSQL server_version_num: connection refused
kong-gateway_1   | 2022/08/26 13:31:39 [error] 1#0: init_by_lua error: /usr/local/share/lua/5.1/kong/cmd/utils/migrations.lua:33: Database needs bootstrapping or is older than Kong 1.0
```

## เพิ่มเงื่อนไขให้กับ depends_on

การใช้งานเราสามารถกำหนดเงื่อนเพิ่มเข้าไปได้ว่าจะให้เริ่ม start เมื่อไหร่ โดยมีเงื่อนอยู่ 3 แบบ คือ

- `service_started`: จะเหมือนกับแบบไม่ใส่เงื่อนไข คือ เริ่ม start ทันที หลังจาก service ที่ระบุ start แล้ว
- `service_healthy`: คือ รอจนกว่า services ที่ระบุ พร้อมทำงานแล้ว โดยดูจากสถานะเป็น “healthy” โดยจะต้องใช้  [healthcheck](https://docs.docker.com/compose/compose-file/#healthcheck) เป็นตัวทดสอบ
- `service_completed_successfully`: คือ รอจนกว่า services ที่ระบุนั้นจะรันสำเร็จแล้ว

### การใช้งาน service_healthy

จากปัญหาก่อนหนัานี้ เราจะใช้ `service_healthy` เป็นตัวกำหนดเงื่อนให้รอให้ kong-database พร้อมใช้งานก่อน ซึ่งสามารถกำหนดได้ ดังนี้

1. เพิ่ม `healthcheck` ให้กับ postgres โดยจะใช้ `test` เป็นตัวใช้คำสั่งสำหรับการทดสอบ

```diff:docker-compose.yml
kong-database:
    image: postgres:9.6-alpine
    restart: always
    ports:
      - '5432:5432'
    environment:
      - TZ=Asia/Bangkok
      - PGTZ=Asia/Bangkok
      - POSTGRES_USER=kong
      - POSTGRES_PASSWORD=kongpass
      - POSTGRES_DB=kong
    volumes:
      - pg-data:/var/lib/postgresql/data
+   healthcheck:
+     test: pg_isready -U kong -h 127.0.0.1
+     interval: 5s
+     timeout: 5s
+     retries: 5
```

1. กำหนดเงื่อนไขให้กับ `depends_on` โดยใช้ `condition`

```diff:docker-compose.yml
kong-migrate:
    image: kong/kong-gateway:2.8.1.4-alpine
    environment:
      - KONG_DATABASE=postgres
      - KONG_PG_HOST=kong-database
      - KONG_PG_USER=kong
      - KONG_PG_PASSWORD=kongpass
    command: 'kong migrations bootstrap'
+   depends_on:
+     kong-database:
+       condition: service_healthy

  kong-gateway:
    image: kong/kong-gateway:2.8.1.4-alpine
    environment:
      - KONG_DATABASE=postgres
      - KONG_PG_HOST=kong-database
      - KONG_PG_USER=kong
      - KONG_PG_PASSWORD=kongpass
      - KONG_PROXY_ACCESS_LOG=/dev/stdout
      - KONG_ADMIN_ACCESS_LOG=/dev/stdout
      - KONG_PROXY_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl
      - KONG_ADMIN_GUI_URL=http://localhost:8002
    ports:
      - 8000:8000
      - 8443:8443
      - 8001:8001
      - 8444:8444
      - 8002:8002
      - 8445:8445
      - 8003:8003
      - 8004:8004
+   depends_on:
+     kong-database:
+       condition: service_healthy
```

เมื่อลองรัน docker-compose up ดู รอบนี้จะพบว่า kong-migrate นั้นสามารถรันได้เลย แต่ kong-gateway ยังไม่สามารถรันได้ เนื่องจากยัง migrate ฐานข้อมูลยังไม่เสร็จนั้นเอง

```bash
kong-gateway_1   | 2022/08/26 13:51:06 [error] 1#0: init_by_lua error: /usr/local/share/lua/5.1/kong/cmd/utils/migrations.lua:37: New migrations available; run 'kong migrations up' to proceed
kong-gateway_1   | stack traceback:
kong-gateway_1   |      [C]: in function 'error'
kong-gateway_1   |      /usr/local/share/lua/5.1/kong/cmd/utils/migrations.lua:37: in function 'check_state'
kong-gateway_1   |      /usr/local/share/lua/5.1/kong/init.lua:539: in function 'init'
kong-gateway_1   |      init_by_lua:3: in main chunk
kong-gateway_1   | nginx: [error] init_by_lua error: /usr/local/share/lua/5.1/kong/cmd/utils/migrations.lua:37: New migrations available; run 'kong migrations up' to proceed
kong-gateway_1   | stack traceback:
kong-gateway_1   |      [C]: in function 'error'
kong-gateway_1   |      /usr/local/share/lua/5.1/kong/cmd/utils/migrations.lua:37: in function 'check_state'
kong-gateway_1   |      /usr/local/share/lua/5.1/kong/init.lua:539: in function 'init'
kong-gateway_1   |      init_by_lua:3: in main chunk
kong_kong-gateway_1 exited with code 1
```

ซึ่งเราจะต้องเพิ่มเงื่อนให้ kong-gateway รอให้ kong-migrate ทำงานให้เสร็จก่อนนั้นเอง

### การใช้งาน service_completed_successfully

การที่จะกำหนดให้ kong-gateway รอให้ kong-migrate ทำงานให้เสร็จก่อนนั้น เราจะใช้เงื่อนแบบ `service_completed_successfully` มาช่วยในการตรวจสอบ โดยมีวิธีการกำหนด แบบนี้

```diff:docker-compose.yml
kong-gateway:
    image: kong/kong-gateway:2.8.1.4-alpine
    environment:
      - KONG_DATABASE=postgres
      - KONG_PG_HOST=kong-database
      - KONG_PG_USER=kong
      - KONG_PG_PASSWORD=kongpass
      - KONG_PROXY_ACCESS_LOG=/dev/stdout
      - KONG_ADMIN_ACCESS_LOG=/dev/stdout
      - KONG_PROXY_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl
      - KONG_ADMIN_GUI_URL=http://localhost:8002
    ports:
      - 8000:8000
      - 8443:8443
      - 8001:8001
      - 8444:8444
      - 8002:8002
      - 8445:8445
      - 8003:8003
      - 8004:8004
    depends_on:
      kong-database:
        condition: service_healthy
+     kong-migrate:
+       condition: service_completed_successfully
```

ทดสอบโดยให้ลบ volumn ของ postgres ออกไปก่อน แล้วลองรันใหม่อีกครั้ง จะเห็นว่า services มีลำดับการ start ตามที่เรากำหนดไว้

```bash
docker-compose down -v
docker-compose up

Creating network "kong_default" with the default driver
Creating volume "kong_pg-data" with default driver
Creating kong_kong-database_1 ... done
Creating kong_konga_1         ... done
Creating kong_kong-migrate_1  ... done
Creating kong_kong-gateway_1  ... done
Attaching to kong_konga_1, kong_kong-database_1, kong_kong-migrate_1, kong_kong-gateway_1

```

และทุก services สามารถทำงานได้แล้ว เมื่อดูจาก log จะเห็น kong-gateway นั้นจะเริ่ม start เมื่อ kong-migrate จบการทำงานเรียบร้อยแล้วตามที่กำหนดไว้

```bash
kong_kong-migrate_1 exited with code 0
kong-gateway_1   | 2022/08/26 13:59:42 [warn] 1#0: the "user" directive makes sense only if the master process runs with super-user privileges, ignored in /usr/local/kong/nginx.conf:6
kong-gateway_1   | nginx: [warn] the "user" directive makes sense only if the master process runs with super-user privileges, ignored in /usr/local/kong/nginx.conf:6
kong-gateway_1   | 2022/08/26 13:59:42 [notice] 1#0: [lua] license_helpers.lua:123: read_license_info(): [license-helpers] could not decode license JSON: No license found
```

## สรุป

เมื่อเราต้องการกำหนดลำดับการ start services ใน docker-compose สามารถทำได้โดยการใช้ depends_on มากำหนด service dependencies เพื่อสั่งให้ทุก dependencies start ขึ้นมาก่อน หรือจะใช้เงื่อนไขแบบอื่นก็ได้ เช่น `service_healthy` คือ รอจนกว่า service dependencies นั้นๆ จะมีสถานะเป็น “healthy” หรือ `service_completed_successfully` คือ รอจนกว่า service dependencies นั้นๆ จะทำงานเสร็จแล้ว

ไฟล์ docker-compose.yml แบบเต็มๆ ดูได้[ที่นี่](https://gist.github.com/somprasongd/c485b6ccc779cd6220498025a7784b10)
