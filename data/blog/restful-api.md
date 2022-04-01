---
title: RESTful API คืออะไร
date: '2017-05-28'
tags: ['rest', 'api']
draft: false
summary: 'RESTful เป็น Web Service รูปแบบหนึ่งที่ทำให้คอมพิวเตอร์ตา่งเครื่องกัน สามารถคุยกันได้ผ่านอินเตอร์เน็ต'
---

# RESTful API

**REST** => **Re**presentational **S**tate **T**ransfer

**RESTful** เป็น Web Service รูปแบบหนึ่งที่ทำให้คอมพิวเตอร์ตา่งเครื่องกัน สามารถคุยกันได้ผ่านอินเตอร์เน็ต

เปรียบเทียบ RESTful API กับ Traditional Web Architecture (เวบแบบเก่าที่ส่ง HTML กลับมาที่ browser)

| Traditional Web Architecture                        | RESTful API                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| Clinet-Server                                       | Client-Server แต่ client เป็นอะไรก็ได้ เช่น Browser, Mobile, Desktop App |
| ทำทุกอย่างที่ Server แล้วส่ง HTML กลับมาที่ browser | Server จะมีแต่ Resources ให้ client เข้าถึงได้                           |
| เป็น Statefull เช่น มีการจำ session                 | Stateless ไม่มีการจำอะไรไว้                                              |

การเข้าถึง Resources ที่ Server จาก client โดยการระบุผ่าน URI เช่นทำผ่าน URL `/users/1` และต้องบอกว่าเราต้องการทำอะไรด้วย โดยใช้ HTTP Verbs

#### HTTP Verbs

- GET เพื่อขอข้อมูล เช่น /users หมายถึงต้องการดึงข้อมูลของ user ทุกคนออกมา
- POST เพื่อบันทึกข้อมูลใหม่ เช่น /users แล้วใส่ข้อมูลใหม่ไปใน body message
- PUT เพื่ออัพเดทข้อมูลเก่าด้วยข้อมูลใหม่ทั้งหมด เช่น /users1
- PATCH เพื่ออัพเดทข้อมูลแค่บางส่วน เช่น /users1
- DELETE เพื่อลบข้อมูล เช่น /users1

เมื่อ Server ทำงานเสร็จแล้วจะต้องมีการตอบกลับออกมา ซึ่งอาจจะเป็น

- HTML โดยมี MIME Type: text/html
- XML โดยมี MIME Type: application/xml
- JSON โดยมี MIME Type: application/json

เป็น Stateless ดังนั้นจะไม่มีการจำอะไรไว้ที่ server จึงไม่มีการใช้งาน session ซึ่ง server จะไม่รู้ว่าผู้ใช้งานคือใคร ดังนั้น client ต้องเป็นฝ่ายบอกว่าคือใคร

client ต้อง cache ได้ ซึ่งก็คือถ้า client ต้องการดูข้อมูลตัวเดิม client ก็สามารถไปดูจาก cache ได้ ไม่ต้องร้องขอมาที่ server

Layered Sytem คือ client ไม่ต้องติดต่อกับ server โดยตรง สามารถใช้ load balance มาเป็นตัวจัดการรับ req แล้วส่งไปหา server เอง

Code On Demand เป็น optionmal คือ RESTFul API สามารถคืนค่าออกมาเป็นโค้ดชุดหนึ่งได้ แล้วเอาไปรันต่อที่ฝั่ง client

#### HTTP Status Code

เมื่อมีการส่ง request ไปยัง API Server มันจะส่ง response ตอบกลับมา ซึ่งจะมี status code อยู่ด้วย

| Code | Status                 |
| ---- | ---------------------- |
| 1xx  | Infromational reponses |
| 2xx  | Success                |
| 3xx  | Redirect               |
| 4xx  | Client Errors          |
| 5xx  | Server Errors          |

ที่เจอบ่อยๆ

| Code | Status                                                              |
| ---- | ------------------------------------------------------------------- |
| 200  | OK                                                                  |
| 201  | Created (เช่น สร้าง resource ใหม่เรียบร้อย)                         |
| 204  | No Content (ทำสำเร็จ แต่ไม่มีการส่งข้อมูลกลับมา)                    |
| 401  | Unauthorized (ไม่มีสิทธิเข้าถึง resource ที่เรียกไป)                |
| 404  | Not Found (ไม่มีอยู่)                                               |
| 405  | Method not allowed (เข้าถึง method ที่ไม่อนุญาต)                    |
| 422  | Unprocessable Enity (ข้อมูลที่ส่งมาถูกต้อง แต่ไม่สามารถประมวลผลได้) |
| 500  | Internal Server Error (error ที่ server)                            |
