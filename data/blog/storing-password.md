---
title: เราควรออกแบบวิธีการจัดเก็บ password อย่างไรดี
date: '2017-06-01'
tags: ['security', 'nodejs']
draft: false
summary: 'โดยปกติระบบจัดการผู้ใช้งาน ต้องมีการ login เข้ามาในระบบ เราจะต้องมีการจัดเก็บ username กับ password ไว้ที่ server แล้วให้ผู้ใช้งานจะต้องส่ง username กับ password มาตรวจสอบว่าตรงกันหรือไม่ ดังนั้นเราจะมาดูว่า เราควรออกแบบวิธีการจัดเก็บ password นี้ไว้อย่างไรดี'
---

# วิธีการจัดเก็บรหัสผ่าน

โดยปกติระบบจัดการผู้ใช้งาน ต้องมีการ login เข้ามาในระบบ เราจะต้องมีการจัดเก็บ username กับ password ไว้ที่ server แล้วให้ผู้ใช้งานจะต้องส่ง username กับ password มาตรวจสอบว่าตรงกันหรือไม่ ดังนั้นเราจะมาดูว่า เราควรออกแบบวิธีการจัดเก็บ password นี้ไว้อย่างไรดี

## ลองมาดูวิธีแรก

แบบง่ายๆ เลย เราก็เก็บ username กับ password ไว้ตรงๆ ไปเลย แบบนี้

| Username | Password  |
| -------- | --------- |
| user1    | password1 |
| user2    | password2 |
| user3    | password3 |

**ข้อเสีย** ถ้ามี hacker สามารถเจาะเข้ามาในระบบเราได้ hacker ก็จะได้ username กับ password ออกไปใช้ได้เลย และถ้าเกิดผู้ใช้งานดันใช้ username กับ password เดียวกันกับระบบอื่นๆ อีก hacker ก็สามารถเอาไปใใช้กับระบบอื่นต่อได้เลย

**สรุปว่า** ไม่ดี ไม่ควรทำ

## งั้นก็เข้ารหัส password ไว้สิ

ตอนจัดเก็บกับเอา password มาเข้ารหัสก่อน เช่น MD5, SHA1 เป็นต้น แล้วจัดเก็บเอาไว้

```text
------------       -----------------        ------------------------------------
| password |  ---> | Hash Function |  --->  | 5f4dcc3b5aa765d61d8327deb882cf99 |
------------       -----------------        ------------------------------------
```

ก็จะได้เป็นแบบนี้ แค่นี้ hacker อ่านไม่รู้เรื่องแล้ว

| Username | Password (MD5)                   |
| -------- | -------------------------------- |
| user1    | 7c6a180b36896a0a8c02787eeafb0e4c |
| user2    | 6cb75f652a9b52798eb6cf2201057c73 |
| user3    | 819b0643d6b89dc9b579fdfc9094f28e |

ส่วนขั้นตอนการ login ก็เอา password ที่ส่งมาเข้ารหัสด้วยฟังก์ชันเดียวกัน เสร็จแล้วเอาไปเปรียบเทียบกับอันที่เราจัดเก็บเอาไว้ ว่าตรงกันรึป่าว

**สรุป** วิธีนี้ก็ยังไม่ดีอ เพราะถึงจะอ่านไม่รู้เรื่อง แต่ hacker ก็สามารถเอาไปใช้ได้ง่ายๆ อยู่ดี เช่น hacker อาจจะทำตารางเปรียบเทียบเอาไว้ว่า password แต่ละตัว มีรหัส MD5 ว่าอะไร เพราะคนส่วนใหญ่จะใช้รหัสง่ายๆ กัน เช่น 1234, password1234 ถ้าดันไปเจอข้อมูลที่ตรงกัน hacker ก็จะทราบว่า username นั้นๆ ให้ password จริงๆ ว่าอะไร

## งั้นต้องเพิ่มความยากเข้าไปอีก

โดยการใช้ "salt" + password แล้วเอาไปเข้ารหัสอีกที

```text
---------------------       -----------------        ------------------------------------
| "salt" + password |  ---> | Hash Function |  --->  | 67a1e09bb1f83f5007dc119c14d663aa |
---------------------       -----------------        ------------------------------------
```

> "salt" คือ ค่าๆ หนึ่ง ที่เป็นความลับในระบบของเรา

ในขั้นตอนการ login ก็เอา "salt" ในระบบ + password ที่ส่งมา แล้วเอาไปเปรียบเทียบกับตัวที่เข้ารหัสเก็บไว้

**สรุป** วิธีนี้ก็จะทำให้ hacker ใช้วิธีเปรียบเทียบกับตารางของ hacker ไม่ได้แล้ว แต่ถ้า hacker สามารถเจาะเข้ามา ก็อาจเอา "salt" ของเราไปได้เช่นกัน

## งั้นก็ให้ "salt" ของแต่ละคนไม่ซ้ำกันไปเลยสิ

ก็คือให้สร้าง "salt" แยกไปแต่ละผู้ใช้งานไปเลย ส่วนการทำงานที่เหลือก็เหมือนเดิม

| Username | salt       | salt + Password (MD5)            |
| -------- | ---------- | -------------------------------- |
| user1    | 55f312f84e | 8a9998e55776b25b56b9ecd648325c34 |
| user2    | 7785aa1efa | fc2b07a0eda86c2b7094a2ca8efbd49b |
| user3    | 552acbf251 | 19f4345ebf2e34d1e091873c0ea76c12 |

### ตัวอย่างโค้ด ใน [Node.js](./Node.js)

#### การเข้ารหัส

```javascript
// controller
create(req, res) {
    const {username, password} = req.body;
    User.create(username, password).then(user => {
        res.status(201).json({user});
    });
}



// model
const crypto = require('crypto');

function hashPassword (salt, password) {
    /*
    crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
    - iterations => จำนวนรอบ
    - keylen => byte length
    - digest => digest
    */
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
};

function create(username, password) {
    return new Promise((resolve, reject) => {
        const salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');

        const hash = hashPassword(salt, password);

        // create new user object
        const user = {
            username,
            salt,
            password: hash
        }
        // save user to db
        db.save(user);
        resolve(user);
    });

}

```

#### การตรวจสอบ

```javascript
// user ต้องเอา username ไปหามาจากใน db ก่อน
function verify(user, password) {
  return new Promise((resolve, reject) => {
    const hash = hashPassword(user.salt, password)
    const isValid = hash === user.password
    resolve(isValid)
  })
}
```

**สรุป** เอาวิธีนี้หล่ะ ทำให้ hacker ลำบากสุด

## แต่ขอเพิ่มความยากอีกนิดนึง

เนื่องจาก MD5 หรือ SHA1 แบบที่เลือกข้างต้นนั้น เป็นอัลกอริทึมที่ออกแบบเพื่อให้ประมวลได้เร็ว ทำให้ hacker สามารถลองสุ่ม password เข้ามา แล้วรู้ผลได้เร็วเช่นกัน ซึ่งเราควรใช้งานอัลกอริทึมที่ทำงานช้าแทน เพื่อเพิ่มความยากให้กับ hacker เช่น bcrypt

### ตัวอย่างการใช้ [bcrypt](https://www.npmjs.com/package/bcrypt) ใน [Node.js](./Node.js)

#### การเข้ารหัส

```javascript
// controller
create(req, res) {
    const {username, password} = req.body;
    User.create(username, password).then(user => {
        res.status(201).json({user});
    });
}



// model
function create(username, password) {
    return new Promise((resolve, reject) => {
        let saltRound = 10; // คือจำนวนรอบในการทำงานผ่านอัลกอริทึมใน bcrypt 10 = 2 ยกกำลัง 10 รอบ
        bcrypt.hash(password, saltRound, (err, hash) => {
            if(err){
                reject(err);
            }else{
                // เมื่อทำงานเสร็จจะได้ผลลัพธ์ออกมาเป็น hash
                // create new user object
                const user = {
                    username,
                    password: hash
                }
                // save user to db
                db.save(user);
                resolve(user);
            }
        });
    });

}

```

#### การตรวจสอบ

```javascript
// user ต้องเอา username ไปหามาจากใน db ก่อน
function verify(user, password) {
  return new Promise((resolve, reject) => {
    const hash = user.password

    bcrypt.compare(password, hash, (err, isValid) => {
      if (err) {
        reject(err)
      } else {
        resolve(isValid)
      }
    })
  })
}
```
