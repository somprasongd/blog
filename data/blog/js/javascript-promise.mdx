---
title: 'JavaScript - Promise'
date: '2017-05-22'
tags: ['javascript']
draft: false
summary: 'Promise เป็นฟีเจอร์ใหม่ใน ES6 ช่วยให้การเขียนโปรแกรมแบบอะซิงโครนัส มีประสิทธิภาพมากขึ้น'
---

# Promise

Promise เป็นฟีเจอร์ใหม่ใน ES6 ช่วยให้การเขียนโปรแกรมแบบอะซิงโครนัส มีประสิทธิภาพมากขึ้น

**Asyncohronous** คือ การทำงานของโปรแกรมที่ไม่ต้องรอคอยให้ประโยคคำสั่งบรรทัดปัจจุบันทำงานให้เสร็จก่อน และค่อยไปทำงานประโยคคำสั่งบรรทัดถัดไป เช่น

- setTimeout() ที่ใช้ดีเลย์การทำงานของโปรแกรม
- setInterval() ที่ใช้วนซ้ำการทำงาน ตามระยะเวลาที่ระบุ
- การเขียนโปรแกรมแบบ AJAX เช่น การใช้ XMLHttpRequest
- การประมวลผลจาวาสคริปต์ใน Node.js

**ตัวอย่าง**

```javascript
setTimeout(() => console.log('Timeout'), 10000)

console.log('Last Statement')

/* Result
"Last Statement"
"Timeout" */

// จะเห็นว่าบรรทัดแรก ต้องรอ 10 วินาที มันจึงข้ามมาทำงานที่บรรทัดสุดท้ายก่อน ไม่ต้องหยุดคอย
```

**ปัญหา** เนื่องจากการเขียนโปรแกรมแบบอะซิงโครนัส เราจะไม่ทราบลำดับว่าประโยคคำสั่งไหนจะทำงานเสร็จก่อนเสร็จทีหลัง จึงมักจะพบปัญหาเรื่องของการจัดการซอร์สโค้ด เราจึงใช้ Promise มาช่วยจัดการกับปัญหานี้

## Promise จะแบ่งเป็น 3 ส่วนหลักๆ

### 1. การสร้าง Promise

สร้าง Promise จากคอนสตรัคเตอร์

```javascript
let promise = new Promise(executor_function)
```

### 2. Executor Function

ซึ่งก็คือ [Callback Function](/blog/js/javascript-callback) ธรรมดาตัวหนึ่ง **ที่จะต้องมีพารามิเตอร์ 2 ตัว** คือ `resolve` กับ `reject` (จะตั้งชื่ออื่นก็ได้) ซึ่งจะเกี่ยวข้องกับสถานะของ Promise เมื่อทำงานเสร็จแล้ว

สถานะของ Promise จะมี 3 สถานะ

1. สถานะ Pending คือ promise ยังทำงานไม่เสร็จ
2. เมือ Promise ทำงานเสร็จแล้วจะเข้าสู่สถานะตัดสินใจ (Settled) ตัวแรกคือ สถานะ Fulfilled คือ ทำงานสำเร็จ จะเรียกไปที่ `resolve()`
3. สถานะ Rejected คือ ทำงานไม่สำเร็จ หรือเกิด error ขึ้นระหว่างการทำงาน จะเรีกยไปที่ `reject()`

#### รูปแบบการใช้งาน

```javascript
function executorFunction(resolve, reject) {
  // Asyncohronous Code
  if (success) {
    resolve(value)
  }
  if (failed) {
    reject(error)
  }
}
```

### 3. การมอนิเตอร์การทำงานของ Promise ว่าทำงานสำเร็จ หรือไม่สำเร็จ

#### เมื่อทำงานสำเร็จ

`promise.then()` จะรับอาร์กิวเมนต์ 2 ตัว ที่เป็น callback function ทั้งคู่ โดยตัวแรกจะดักกับสถานะ fulfilled ตัวที่สองจะดักจับสถานะ rejected

```javascript
let asynFunc = (resolve, reject) => {
  console.log('Start a job')
  // Asyncohronous Code ...
  setTimeout(() => {
    let min = 1,
      max = 10
    // Getting a random number between two values
    let result = Math.floor(Math.random() * (max - min)) + min
    if (result > 5) {
      resolve('success')
    } else {
      reject(new Error('failed'))
      // หรือ
      // throw new Error('failed');
    }
  }, 5000)
}

let promise = new Promise(asynFunc)
// monitor
promise.then(
  (value) => console.log(`Promise: ${value}`), // เมื่อทำงานสำเร็จ
  (error) => console.log(`Promise: ${error.message}`) // เมื่อทำงานไม่สำเร็จ
)

console.log('Last Statement')

/*Result
"Start a job"
"Last Statement"
"Promise: success" หรือ "Promis: failed"
*/
```

[ Note 1 ] ถ้ากรณีที่ต้องการดักจับเฉพาะกรณีที่สำเร็จเพียงอย่างเดียว ก็ไม่ต้องใส่อาร์กิวเมนต์ที่สองลงไปก็ได้ `promise.then((value) => console.log('Promise: ', value));`

[ Note 2 ] ถ้ากรณีที่ต้องการดักจับเฉพาะกรณีที่ไม่สำเร็จเพียงอย่างเดียว จะต้องใส่อาร์กิวเมนต์ที่แรกเป็น `null` ดังนี้ `promise.then(null, (error) => console.log('Promise: ', error.message));`

#### เมื่อไม่สำเร็จ

`promise.catch()` จาก [Note 2] สามารถเขียนให้สั้นกระชับลงได้โดยการใช้ `promise.catch((error) => {}))` แทน ตัวอย่าง

```javascript
let promise = new Promise((resolve, reject) => {
  console.log('Start a job')
  setTimeout(() => reject('failed'), 5000)
})
promise.catch((reason) => console.log(`Promise: ${reason}`))

console.log('Last Statement')

/*Result
"Start a job"
"Last Statement"
"Promis: failed"
*/
```

#### การดักจับผลการทำงานแบบต่อเนื่อง

เนื่องจากเมื่อเรียกใช้งานทั้ง then() และ catch() **มันจะถูกรีเทิร์นออกมาเป็น Promise ที่มีสถานะ fulfilled ให้อัตโนมัติ**โดยไม่ต้องเขียน return อะไรเลย ยกเว้นว่าจะเกิด error มันจะรีเทิร์น Promise ที่มีสถานะ rejected ออกมาแทน ทำให้สามารถเรียกใช้งาน .then() หรือ .catch() ต่อกันไปได้เรื่อยๆ

```javascript
// then().then()
let p1 = new Promise((resolve, reject) => resolve('success'))
let p2 = p1.then((value) => console.log('Promise: ', value))
p2.then(() => console.log('Finish'))
/* Result
"Promise: success"
"Finish" */

// หรือจะเขียนเป็นลูกโซ่ต่อเนื่องไปเรื่อยๆ ก็ได้
let promise = new Promise((resolve, reject) => {
  resolve('success')
})

promise
  .then((value) => {
    console.log('Promise: ', value)
  })
  .then(() => {
    // callbackFunc ไม่มีพารามิเตอร์ ถ้ามีจะเป็น undefined
    console.log('then1: finish')
  })
  .then(() => {
    // callbackFunc ไม่มีพารามิเตอร์ ถ้ามีจะเป็น undefined
    console.log('then2: finish')
  })
/* Result
"Promise: success"
"then1: finish"
"then2: finish" */

// catch().catch()
let promise = new Promise((resolve, reject) => {
  throw new Error('error1')
})

promise
  .catch((error) => {
    console.log('catch1: ', error.message)
    throw new Error('error2')
  })
  .catch((error) => {
    console.log('catch2: ', error.message)
    throw new Error('error3')
  })
  .catch((error) => {
    console.log('catch3: ', error.message) // ไม่มีการ throw แสดงว่าไม่เกิด error จะไม่เข้า .catch() ตัวถัดไป
  })
  .catch((error) => {
    console.log('catch4: ', error.message)
  })
/*Result
"catch1: error1"
"catch2: error2"
"catch3: error3"
*/

// การใช้ return ส่งค่าออกไปให้ .then() ตัวถัดไป
let promise = new Promise((resolve, reject) => {
  resolve('success')
})

promise
  .then((value) => {
    console.log('then1: ', value)
    return 2 // ส่ง 2 ไปให้ then() ตัวถัดไป
  })
  .then((value) => {
    // callbackFunc มีพารามิเตอร์
    console.log('then2: ', value)
    return 3 // ส่ง 3 ไปให้ then() ตัวถัดไป
  })
  .then((value) => {
    // callbackFunc มีพารามิเตอร์
    console.log('then3: ', value)
  })
/* Result
"then1: success"
"then2: 2"
"then3: 3" */
```

#### รีเทิร์น promise

`return promise;` จากด้านบน then() กับ catch() จะรีเทิร์น promise ออกมาให้อัตโนมัติ แต่เราสามารถเขียนให้รีเทิร์น promise ตัว ที่เราต้องการออกมาเองได้

```javascript
let p1 = new Promise((resolve, reject) => resolve('promise1'))
let p2 = new Promise((resolve, reject) => resolve('promise2'))

let p3 = p1.then((value) => {
  console.log('First then:', value)
  return p2
})

p3.then((value) => {
  console.log('Second then:', value)
})

/*Result
"First then: promise1"
"Second then: promise2"*/

// หรือเขียนแบบนี้
p1.then((value) => {
  console.log('First then:', value)
  return p2
}).then((value) => {
  console.log('Second then:', value)
})
```

- การใช้ `then()` ร่วมกับ `catch()` ถ้า Promise ที่ทำงานเสร็จแล้วมีสถานะเป็น rejected มันจะไม่เรียกใช้งาน promise.then() แต่ promise.then() จะรีเทิร์นพรอมิสตัวที่ทำงานไม่เสร็จตัวเดิมออกมา จึงทำให้ promise.catch() ตัวถัดมาทำงานได้ เสมือนว่ามันกระโดข้ามจาก then() ตัวแรกไปยัง catch() ตัวสุดท้าย

```javascript
let promise = new Promise((resolve, reject) => resolve(1))
promise
  .then((value) => {
    console.log('then:', value)
    return 2
  })
  .then((value) => {
    console.log('then:', value)
    throw new Error(3)
  })
  .then((value) => {
    // ไม่ถูกเรียกให้ทำงาน
    console.log('then:', value)
  })
  .catch((error) => {
    console.log('catch:', error.message)
  })
/*Result
"then: 1"
"then: 2"
"catch: 3"*/
```

#### การสร้างพรอมิสที่มีสถานะ settled ตั้งแต่เริ่มต้น

การสร้างพรอมิสที่มีสถานะ settled ตั้งแต่เริ่มต้นสร้างมันขึ้นมา ทำได้โดย

- `Promise.resolve();` สร้างพรอมิสที่มีสถานะเป็น fulfilled ตั้งแต่แรก
- `Promise.reject();` สร้างพรอมิสที่มีสถานะเป็น rejected ตั้งแต่แรก

```javascript
// fulfilled
let promise = Promise.resolve('Promise is fulfilled')
/* เหมือนกับ
let promise = new Promise((resolve, reject) => resolve('Promise is fulfilled'));
*/
promise.then((value) => console.log(value))

// rejected
let promise2 = Promise.reject('Promise is rejected')
/* เหมือนกับ
let promise = new Promise((resolve, reject) => reject('Promise is rejected'));
*/
promise2.catch((value) => console.log(value))
```

#### อื่นๆ

- `Promise.all()` จะใช้มอนิเตอร์พรอมิสหลายๆ ตัวพร้อมกัน (`then()` หรือ `catch()` จะมอนิเตอร์ได้ทีละตัว) โดยมันจะดักจับเหตุการณ์ที่พรอมิสทุกตัวต้องอยู่ในสถานะ fulfilled เท่านั้น แต่ถ้ามีเกิดมีพรอมิสที่มีสถานะเป็น rejected ขึ้นมา มันจะเลือกมอนิเตอร์แค่เฉพาะตัวแรกที่เป็น rejected เท่านั้น
  - `Promise.all()` จะรับค่าอาร์กิวเมนต์เป็นอาร์เรย์ `Promise.all([promise1, promise2, promise3])`
  - `Promise.all()` จะรีเทิร์นออกมาเป็นพรอมิสตัวใหม่
  - `Promise.all().then()` ถ้าเป็น fulfilled ค่าที่ส่งมาจะเป็นอาร์เรย์เรียงผลลัพธ์ของแต่ละพรอมิส ถ้าเป็น rejected จะได้ออกมาตัวเดียวคือของพรอมิสที่ rejected ตัวแรก

```javascript
// fulfilled
let p1 = Promise.resolve('Promise1')
let p2 = Promise.resolve('Promise2')
let p3 = Promise.resolve('Promise3')

let p4 = Promise.all([p1, p2, p3])
p4.then((value) => console.log(value))

/*Result
["Promise1", "Promise2", "Promise3"]*/

// rejected
let p1 = Promise.resolve('Promise1')
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise2')
  }, 2000)
})
let p3 = Promise.reject('Promise3') // ตัวนี้จะเสร็จก่อน p2 ที่ดีเลย์ไว้ 2 วินาที

let p4 = Promise.all([p1, p2, p3])
p4.then(
  (value) => console.log(value, 'success'),
  (value) => console.log(value, 'failed')
)

/* Result
"Promise3 failed" */
```

- `Promise.race()` จะคล้ายๆ กับ `Promise.all()` ต่างกันที่ `Promise.race()` จะมอนิเตอร์พรอมิสแค่ตัวเดียว คือตัวที่ทำงานเสร็จก่อน (มีสถานะ settled ก่อน) อาจจะเป็น fulfilled หรือ rejected ก็ได้

```javascript
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise21')
  }, 5000) // delay 5 sec
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise2')
  }, 2000) // delay 5 sec
})
let p3 = Promise.reject('Promise3') // ตัวนี้จะเสร็จก่อน

let p4 = Promise.race([p1, p2, p3])
p4.then(
  (value) => console.log(value, 'success'),
  (value) => console.log(value, 'failed')
)

/* Result
"Promise3 failed" */
```

## ตัวอย่างการใช้ Promise ใน Node.js

### เขียนโปรแกรมอ่านไฟล์ json.txt

```javascript
const fs = require('fs') // ใช้อ่านไฟล์

function readJSONFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err)
      } else {
        let text = JSON.parse(data)
        let json = JSON.stringify(text, null, 2)
        resolve(json)
      }
    })
  })
}

let readerPromise = readJSONFile('json.txt')
console.log('Read a file')
readerPromise
  .then((value) => {
    console.log(value)
  })
  .catch((err) => {
    console.log('Error:', err.message)
  })

/*Result กรณีไม่มีไฟล์ json.txt
"Read a file"
Error: ENOENT: no such file or directory, open 'C:\Users\sompr\Desktop\json.txt'
*/

/*Result อ่านสำเร็จ
"Read a file"
{
  "name": "Somprasong Damyos",
  "gender": "male",
  "emails": [
    {
      "email": "a@mail.com"
    },
    {
      "email": "b@mail.com"
    },
    {
      "email": "c@mail.com"
    }
  ]
}
*/
```

### Fetch API

การใช้งาน มันจะทำงานแบบ Promise โดยมี default เป็น GET

```javascript
fetch('http://localhost:8080/resources')
  .then((res) => res.json())
  .then((json) => console.log(json))
```

การเรียกใช้งาน HTTP Method อื่นๆ

```javascript
fetch('http://localhost:8080/authentication', {
    method: 'POST',
    headers: {
        'Accept': 'application/json', // รับข้อมูลกลับมาเป็น json
        'Content-Type': 'application/json', // ส่งข้อมูลไปเป็น json
    },
    body: JSON.stringify({
        username: 'ball',
        password: '1234'
    })
})
  .then(res => res.json())
  .then({user} => console.log(user));
```
