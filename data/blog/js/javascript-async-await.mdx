---
title: 'Aysnchronous JavaScript ด้วย async/await (ES2017)'
date: '2017-05-23'
tags: ['javascript']
draft: false
summary: 'Promise เป็นฟีเจอร์ใหม่ใน ES6 ช่วยให้การเขียนโปรแกรมแบบอะซิงโครนัส มีประสิทธิภาพมากขึ้น'
---

# Aysnchronous JavaScript ด้วย async/await (ES2017)

จากเดิมในการเขียนโค้ด asynchronous เราจะใช้ callback function หรือ promise (ES2015) กัน แต่มักจะเจอปัญหาเรื่องการเรียก callback ซ้อนกันหลายๆ ชั้น หรือไม่ก็ใช้ promise chains ต่อกันยาว ทำให้อ่านโค้ดยาก ดูไม่สวย ดังนั้นใน ES2017 จึงมีวิธีการเขียนโค้ด asynchronous แบบใหม่ ด้วยการใช้คีย์เวิร์ด `async` และ `await`

- `await` เมื่อเรียกใช้ promise มันจะทำการหยุดรอจนกว่า promise นั้นๆ จนทำงานเสร็จคือมีสถานะ settled จะ fulfilled หรือ rejected ก็ได้ ดังนั้นมันจึงทำให้ `async function` นั้นดูเหมือนว่ามันทำงานแบบ sequential synchronous
- async/await จะไม่มีการใช้ callback function
- async/await ใช้กับ Node.js version 7.6 ขึ้น
- async/await ทางฝั่ง frontend ต้องแปลงด้วย webpack ก่อนนำไปใช้งาน

## การเขียน asynchronouse function ด้วย async/await

### รูปแบบ

```javascript
// ใส่ async นำหน้าฟังก์ชัน เพื่อบอกว่าฟังก์ชันนี้เป็น asynchronouse function
async function asynFunc(param) {
  // ใส่ await นำหน้า promise เพื่อให้หยุดรอจนการจะได้สถานะ settled คือทำงานเสร็จ
  // response ที่ได้คือ ถ้า fulfilled จะได้ผลลัพธ์ออกมา resolve(value) ถ้า rejected จะได้จาก reject(value)
  const response = await promiseFunc(param)
}
```

### ตัวอย่างการแปลงโค้ดจาก Promise เป็น async/await

จาก Promise

```javascript
const fetch = require('node-fetch')

function showGitHubUser(handle) {
  const url = `https://api.github.com/users/${handle}`
  fetch(url)
    .then((response) => response.json())
    .then((user) => {
      console.log(user.name)
      console.log(user.location)
    })
}

showGitHubUser('somprasongd')
/* Result
Somprasong Damyos
Phuket, Thailand
*/
```

เขียนใหม่ด้วย async/await ได้ดังนั้น

```javascript
const fetch = require('node-fetch')

// async function
async function showGitHubUser(handle) {
  const url = `https://api.github.com/users/${handle}`
  // await pause promise until settled
  const response = await fetch(url)
  const user = await response.json()
  console.log(user.name)
  console.log(user.location)
}

showGitHubUser('somprasongd')

/* Result
Somprasong Damyos
Phuket, Thailand
*/
```

## การเรียกใช้งาน asynchronouse function

เรียกผ่าน Promise chain เนื่องจาก async function จะรีเทิร์นออกมาเป็นพรอมิสตัวใหม่ เราจึงสามารถใช้ promise.then() ดักจับการทำงานได้

```javascript
const fetch = require('node-fetch')

// async function
async function showGitHubUser(handle) {
  const url = `https://api.github.com/users/${handle}`
  // await pause promise until settled
  const response = await fetch(url)
  return await response.json()
}
// call an Asynchronous Function in a Promise Chain
showGitHubUser('somprasongd').then((user) => {
  console.log(user.name)
  console.log(user.location)
})
```

เราไม่สามารถใช้งาน await นอก async function ได้

```javascript
const fetch = require('node-fetch')

// async function
async function showGitHubUser(handle) {
  const url = `https://api.github.com/users/${handle}`
  // await pause promise until settled
  const response = await fetch(url)
  return await response.json()
}
// แบบนี้จะทำไม่ได้
const user = await showGitHubUser('somprasongd') // SyntaxError: Unexpected identifier

// ต้องสร้าง async function แบบ IFFE มาครอบแทน
;(async function () {
  const user = await showGitHubUser('somprasongd')
  console.log(user.name)
  console.log(user.location)
})()
```

## วิธีการแปลงฟังก์ชันแบบต่างๆ ให้เป็น asynchronouse function

```javascript
// 1. function declaration แนะนำแบบนี้ เพราะเรื่อง function hoisting
async function showGitHubUser(handle) {
  const url = `https://api.github.com/users/${handle}`
  const response = await fetch(url)
  return await response.json()
}

// 2. function expression
const showGitHubUser = async function (handle) {
  const url = `https://api.github.com/users/${handle}`
  const response = await fetch(url)
  return await response.json()
}

// 3. arrow function
const showGitHubUser = async (handle) => {
  const url = `https://api.github.com/users/${handle}`
  const response = await fetch(url)
  return await response.json()
}

// 4. method
const fetch = require('node-fetch')

class GitHubApiClient {
  async fetchUser(handle) {
    const url = `https://api.github.com/users/${handle}`
    const response = await fetch(url)
    return await response.json()
  }
}

// การเรียกใช้งาน async function ด้วย arrow fucntion
;(async () => {
  const client = new GitHubApiClient()
  const user = await client.fetchUser('somprasongd')
  console.log(user.name)
  console.log(user.location)
})()
```

## วิธีการจัดการกับ errors ใน asynchronouse function

### วิธีแรก

ใช้ `promise.catch()`

```javascript
const fetch = require('node-fetch')

// async function
async function showGitHubUser(handle) {
  const url = `https://api.github.com/users/${handle}`
  // await pause promise until settled
  const response = await fetch(url)
  const body = await response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }
  return body
}
// call an Asynchronous Function in a Promise Chain
showGitHubUser('idnotexist')
  .then((user) => {
    console.log(user)
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`) // Error: Not Found
  })
```

### วิธีที่สอง

ใช้ try ... catch

```javascript
const fetch = require('node-fetch')

// async function
async function fetchGitHubUser(handle) {
  const url = `https://api.github.com/users/${handle}`
  // await pause promise until settled
  const response = await fetch(url)
  const body = await response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }
  return body
}

// ใช้งาน await นอก async function ไม่ได้
async function showGitHubUser(handle) {
  try {
    const user = await fetchGitHubUser(handle)
    console.log(user.name)
    console.log(user.location)
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
}

showGitHubUser('idnotexist') // Error: Not Found
```

## ปัญหาการใช้ await กับหลายๆ promises

เนื่องจากการใช้ `await` นำหน้า promise มันจะหยุดรอจนกว่า promise ตัวนั้นจะทำงานเสร็จ (settled)

ดังนั้นถ้าเรียกใช้งานหลาย promise โดยใช้ await พร้อมๆ กัน มันจะกลายเป็นการทำงานเป็น sequentail แทน ต้องรอให้ตัวแรกทำงานเสณ้จก่อน แล้วจึงมาทำตัวถัดไป

```javascript
const fetch = require('node-fetch')

// async function
async function fetchFromGitHub(endpoint) {
  const url = `https://api.github.com${endpoint}`
  // await pause promise until settled
  const response = await fetch(url)
  return await response.json()
}

async function showUserAndRepos(handle) {
  const user = await fetchFromGitHub(`/users/${handle}`)
  const repos = await fetchFromGitHub(`/users/${handle}/repos`)

  console.log(user.name)
  console.log(`${repos.length} repos`)
}

showUserAndRepos('somprasongd')

/* Wait 5 sec
Somprasong Damyos
5 repos
*/
```

### วิธีแก้ที่ 1

เรียกใช้งาน promise ทั้งหมดก่อน แล้วค่อยมา await promise ทุกตัวทีหลัง ทำให้ promise ทุกตัวเริ่มทำงานทันจะกลายเป็น concurrently แทน

```javascript
const fetch = require('node-fetch')

// async function
async function fetchFromGitHub(endpoint) {
  const url = `https://api.github.com${endpoint}`
  // await pause promise until settled
  const response = await fetch(url)
  return await response.json()
}

async function showUserAndRepos(handle) {
  const userPromise = fetchFromGitHub(`/users/${handle}`)
  const reposPromise = fetchFromGitHub(`/users/${handle}/repos`)

  const user = await userPromise
  const repos = await reposPromise

  console.log(user.name)
  console.log(`${repos.length} repos`)
}

showUserAndRepos('somprasongd')

/* Wait 3 sec
Somprasong Damyos
5 repos
*/
```

### วิธีแก้ที่ 2

ใช้ `Promise.all()` ดักจับการทำงาน แล้วรีเทิร์นออกมาทีเดียวเป็นอาร์เรย์ตามลำดับที่เรียก promise

```javascript
const fetch = require('node-fetch')

// async function
async function fetchFromGitHub(endpoint) {
  const url = `https://api.github.com${endpoint}`
  // await pause promise until settled
  const response = await fetch(url)
  return await response.json()
}

async function showUserAndRepos(handle) {
  const [user, repos] = await Promise.all([
    fetchFromGitHub(`/users/${handle}`),
    fetchFromGitHub(`/users/${handle}/repos`),
  ])

  console.log(user.name)
  console.log(`${repos.length} repos`)
}

showUserAndRepos('somprasongd')

/* Wait 3 sec
Somprasong Damyos
5 repos
*/
```

## ใช้ await กับ Thenable

จากที่บอกไปว่า `await` จะใช้คู่กับ Promise เพื่อที่จะรอให้ promise นั้นๆ ทำงานจนเสร็จ

แต่ถ้าเราใช้ await กับอย่างอื่น มันจะทำงานใส่ `Promise.resolve()` ครอบไว้ให้อัตโนมัติ

### ตัวอย่างที่ 1

```javascript
async function main() {
  const x = await 42 // จริงๆ แล้วมันจะทำแบบนี้ให้ Promise.resolve(42); ทำให้ใช้ await ได้
  console.log(x) // 42 ไม่ error
}

main()
```

### ตัวอย่างที่ 2

```javascript
const Bluebird = require('bluebird')
async function main() {
  console.log('Start...')
  await Bluebird.delay(2000) // จะหยุดรอ 2 วินาที แล้วค่อยแสดงคำว่า "Done." ออกมา
  console.log('Done.')
}

main()
```

ดูเพิ่มเติมได้จาก [คอร์ส Asynchronous JavaScript with async/await](https://egghead.io/courses/asynchronous-javascript-with-async-await)
