---
title: 'การสร้าง Web Server โดยใช้ Express'
date: '2016-12-19'
tags: ['nodejs', 'express']
draft: false
summary: 'Express เป็น minimalist web framework สำหรับ Node.js ซึ่งมันสามารถทำเป็น frontend และ backend ได้'
---

# การสร้าง Web Server โดยใช้ Express

Express เป็น minimalist web framework สำหรับ Node.js ที่เป็นที่นิยมใช้กันมาก ซึ่งมันสามารถนำมาทำเป็น Web Applications หรือ APIs ก็ได้

**Website:** [http://expressjs.com/](http://expressjs.com/)

**repo:** [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)

## การติดตั้ง

```bash
$npm install express --save
```

## สร้าง Web Server

```javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  // res.send(); ถ้าส่งเป็น text/html/json express จะจัดการกำหนด content-type ให้เอง
  res.send('Hello World')
})

// ระบุ port ของ web server
app.listen(3000, (err) => {
  if (err) {
    console.log('Start server error:', err.message)
  } else {
    console.log('Server is runnig at http://localhost:3000')
  }
})
```

## Object ต่างๆ

### Application Object

- `app.set(name, value);` ไว้สำหรับตั้งค่า environtment variable
- `app.get(name);` ไว้สำหรับ get ค่า environtment variable
- `app.use(path, callback);` สร้าง middleware จัดการ request
- `app.use(express.static(__dirname + '/public'));` สร้าง static folder (folder ที่เปิดให้ใครเข้าถึงก็ได้(public) ไว้ที่ folder ชื่อ public โดย `__dirname` คือ ตำแหน่งของ working directory
- `app.get(path, callback);` สร้าง middleware จัดการ GET Request
- `app.post(path, callback);` สร้าง middleware จัดการ POST Request
- `app.put(path, callback);` สร้าง middleware จัดการ PUT Request
- `app.delete(path, callback);` สร้าง middleware จัดการ DELETE Request
- `app.route(path).get(callback).post(callback);` สร้าง middleware จัดการ Request ที่เรียกมายัง path นั้นว่า ถ้าเป็น GET/POST/PUT/DELETE ให้ทำอะไรบ้าง

### Request Object

- `req.query` ไว้ดึงค่า query string ออกมาเป็น Object
- `req.param` ไว้ดึงค่า routing parameter ออกมาเป็น Object
- `req.body` ไว้ดึงค่า bogy message ออกมาเป็น Object ต้องใช้ bodyParser() ช่วย

### Response Object

- `res.status(code);` ไว้กำหนด HTTP Status Code
- `res.set(field, value);` ไว้กำหนด HTTP Response Header
- `res.redirect(status, url);` redirect ไปยัง URL ที่กำหนด
- `res.send(body);` หรือ `res.send(status, body);` ไว้ส่งผลลัพท์กลับไป ซึ่ง content-type จะเปลี่ยนไปตาม body ที่ส่งไป
- `res.sendFile(path [, options] [, fn])` Send a file as an octet stream.
- `res.sendStatus(statusCode)` Set the response status code and send its string representation as the response body.
- `res.json(body);` หรือ `res.json(status, body);` ไว้ส่งผลลัพท์กลับไปในรูปแบบ json
- `res.jsonp(body);` หรือ `res.jsonp(status, body);` ไว้ส่งผลลัพท์กลับไปในรูปแบบ json
- `res.render(view, [local], callback);` ใช้ในการ render view แล้วส่งเป็น HTML Response กลับไป
- `res.download(path [, filename] [, fn])` Prompt a file to be downloaded.
- `res.end()` End the response process.

## HTML Template Engine

การแสดงหน้าเวบเพจ ปกติข้อมูลมันไม่ได้เป็น static แต่มันจะส่งข้อมูลแบบ dynamic ดังนั้นจะใช้วิธีทำเป็น template เอาไว้ แล้วใช้ `res.render('view');` render และส่ง response กลับไป ซึ่ง Template Engine ที่ใช้ใน express นั้นมีหลายตัว จะยกตัวอย่างการใช้งานตัวที่นิยมใช้ ดังนี้

### 1. hbs

Website: [http://handlebarsjs.com/](http://handlebarsjs.com/ 'http://handlebarsjs.com/')

Repo: [https://www.npmjs.com/package/hbs](https://www.npmjs.com/package/hbs 'https://www.npmjs.com/package/hbs')

การติดตั้ง: `$ npm install hbs --save`

การใช้งาน:

- ต้อง require มาก่อน `const hbs = require('hbs');`
- ให้สร้างไฟล์ template ไว้ที่ folder ชื่อ **"views"**
  - กรณีใช้ไฟล์ template เป็น .hbs
  ```javascript
  const hbs = require('hbs')
  const path = require('path')
  // view engine setup
  app.set('views', path.join(__dirname, 'views')) // ชื่อเดียวกับที่สร้าง folder ไว้
  app.set('view engine', 'hbs')
  ```
  - กรณีใช้ไฟล์ template เป็น .html
  ```javascript
  const hbs = require('hbs')
  const path = require('path')
  // view engine setup
  app.set('views', path.join(__dirname, 'views')) // ชื่อเดียวกับที่สร้าง folder ไว้
  app.set('view engine', 'html')
  app.engine('html', require('hbs').__express)
  ```
- สามารถส่ง parameter ไปให้ template ได้ ตัวอย่าง
  - ไฟล์ app.js
  ```javascript:app.js
  app.get('/about', (req, res) => {
    res.render('about.hbs', {
      // res.render() ใช้ render template ส่งกลับไปส่งที่ browser
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear(),
    })
  })
  ```
  - ไฟล์ template ชื่อ about.hbs
  ```html:about.hbs
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Some Website</title>
    </head>
    <body>
      <h1>{{pageTitle}}</h1>
      <p>Some text here</p>
      <footer>
        <p>Copyright {{currentYear}}</p>
      </footer>
    </body>
  </html>
  ```
- การทำ partial คือ กรณีที่มีบางส่วนของหน้าเวบแสดงผลเหมือนกันในหลายๆ หน้า เช่น header, footer เราสามารถแยกส่วนนี้ไปสร้างเป็นไฟล์เก็บไว้ใน partial folder แล้วค่อยเรียกใช้ในทุกๆ หน้าแทน ตัวอย่างเช่น

  - ที่ไฟล์ app.js

  ```javascript:app.js
  const hbs = require('hbs')
  const express = require('express')
  const app = express()

  // บอกว่า partial folder อยู่ที่ไหน
  hbs.registerPartials(__dirname + 'views/partials/')
  app.set('view engine', 'hbs')
  ```

  - ไฟล์ partial ชื่อ views/partials/footer.hbs

  ```html:views/partials/footer.hbs
  <footer>
    <p>Copyright {{currentYear}}</p>
  </footer>
  ```

  - ไฟล์หน้าจอ about (views/about.hbs) ที่มีการดึง footer มาใช้งาน

  ```html:views/about.hbs
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Some Website</title>
    </head>
    <body>
      <h1>{{pageTitle}}</h1>
      <p>Some text here</p>

      {{> footer}}
    </body>
  </html>
  ```

- การใช้ helper ไว้สร้างตัวแปร เพื่อเรียกใช้งานใน template ตัวอย่างเช่น

  - ไฟล์ app.js

  ```javascript:app.js
  const hbs = require('hbs')
  const express = require('express')
  const app = express()

  hbs.registerPartials(__dirname + 'views/partials/')
  app.set('view engine', 'hbs')

  // ในฟังก์ชันสามารถรับ parameter ได้
  hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
  })
  ```

  - ไฟล์ views/partials/footer.hbs

  ```html:views/partials/footer.hbs
  <footer>
    <p>Copyright {{getCurrentYear}}</p>
  </footer>
  ```

### 2. Jade

```javascript
const jade = require('jade')
const path = require('path')
// view engine setup
app.set('views', path.join(__dirname, 'views')) // ชื่อเดียวกับที่สร้าง folder ไว้
app.set('view engine', 'jade')
```

### 3. EJS

```javascript
const ejs = require('ejs')
const path = require('path')
// view engine setup
app.set('views', path.join(__dirname, 'views')) // ชื่อเดียวกับที่สร้าง folder ไว้
app.set('view engine', 'ejs')
```

### 4. Swig

- ใช้ render ไฟล์ template ที่เป็น .html

```javascript
const swig = require('swig')
const path = require('path')
// view engine setup
app.engine('html', swig.renderFile)
app.set('views', path.join(__dirname, 'views')) // ชื่อเดียวกับที่สร้าง folder ไว้
app.set('view engine', 'html')
```

### SPA (Single Page Application)

ถ้าทำแอฟแบบ SPA เช่นใช้ Angular ไม่ต้องตั้งค่า view engine ให้เอาไฟล์ index.html ไปไว้ที่ folder ชื่อ public แล้วทำเป็น static folder ให้ browser โหลดไปทำงานที่ browser แทน

```javascript:app.js
// ...
// ตั้งค่า static folder
app.use(express.static(path.join(__dirname, 'public'))) // ชื่อเดียวกับที่สร้าง folder ไว้
// ...
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html')) // เพื่อส่ง index.html กลับไปทำงานที่ browser
})
```

## Express Middleware

express สามารถสร้าง middleware เอาไว้หน้า routes ต่างๆ โดยทำงานก่อนเข้าไปที่ route และหลังจากออกจาก route นั้นๆ ก่อนส่ง response กลับไป ซึ่งถ้ามีหลายๆ ตัว จะให้ทำงานแบบ FIFO (First-In-First-Out)

```javascript:app.js
// ใช้ app.use() เพื่อสร้าง middleware มันจะทำงานเรียงจากบนลงล่าง
app.use((req, res, next) => {
  // req คือ Object ของ HTTP Request
  // res คือ Object ของ HTTP Response
  // next คือ เรียกฟังก์ชัน next(); เพื่อไปยัง middleware ตัวถัดไป ถ้าไม่เรียกจะไม่ออกไปจาก middleware ตัวนี้
  next()
})
```

### ตัวอย่างสร้าง middleware เพื่อเก็บ log

```javascript
const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`ว

  console.log(log);
      fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});
```

[ Note ] กรณีที่เกิดข้อผิดพลาดขึ้น แนะนำว่าไม่ต้องเรียก `next();` เพื่อให้ทำงาน middleware ตัวถัดไป ให้เปลี่ยนไปเรียก `res.render('error_page.hbs');` แทนประมาณนี้

## Routing

คือ การจัดการกับ request ที่ส่งมาเข้า โดยจะตรงกำหนดว่าแต่ละ path และ method นั้นจะมีการทำงานยังไง

### Basic routing

ใช้ `app.METHOD(PATH, HANDLER)` ซึ่ง `METHOD` คือ **HTTP request method** ซึ่งต้องเขียนเป็นตัวพิมพ์เล็ก (lowercase) มีตัวอย่างการใช้งานดังนี้

```javascript
// Respond with Hello World! on the homepage:
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Respond to POST request on the root route (/), the application’s home page:
app.post('/', function (req, res) {
  res.send('Got a POST request')
})

// Respond to a PUT request to the /user route:
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

// Respond to a DELETE request to the /user route:
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// There is a special routing method, app.all(), which is not derived from any HTTP method.
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

### Route paths

Route paths เป็นการระบุเส้นทางว่าแต่ละ request จะให้ทำอะไร ซึ่งสามารถเป็นได้ทั้ง strings, string patterns, หรือ regular expressions _(เครื่องหมาย ?, +, \*, และ () เป็น subsets ของ regular expression counterparts. ส่วน hyphen (-) และ dot (.) จะถูกแปรเป็น string path)_

```javascript
// This route path will match requests to the root route, /.
app.get('/', function (req, res) {
  res.send('root')
})

// This route path will match requests to /about.
app.get('/about', function (req, res) {
  res.send('about')
})

// This route path will match requests to /random.text.
app.get('/random.text', function (req, res) {
  res.send('random.text')
})

// Here are some examples of route paths based on string patterns.

// This route path will match acd and abcd.
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})

// This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', function (req, res) {
  res.send('ab+cd')
})
// This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})

// This route path will match /abe and /abcde.
app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})

// Examples of route paths based on regular expressions:

// This route path will match anything with an “a” in the route name.
app.get(/a/, function (req, res) {
  res.send('/a/')
})

// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})
```

### Passing parameters

เราสามารถส่ง parameter ไปกับ path ที่เรียกไปได้ โดยใช้ `:paramName` และเรียกใช้งานผ่าน `req.params`

```text
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

จากตัวอย่างข้างบนสามารถเขียนโค้ดได้

```javascript
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```

### app.route()

กรณีที่มี path เดียวกัน และต้องการทำงานหลาย methods แต่ไม่ใช่ทุก methods (`app.all()`) จะใช้ `app.route()` สร้าง chain ต่อไปเรื่อยๆ เช่น

```javascript
app
  .route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

### express.Router

เนื่องจาก Node.js สามารถสร้างโปรแกรมแบบ Modular ได้ ดังนั้นเราสามารถสร้างไฟล์แยกออกไปใช้ router จัดการกับ method, path ต่างๆ แล้วใช้ middleware โหลดเข้ามา

- สร้างไฟล์ birds.js ไว้ใน /app

```javascript:birds.js
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```

- โหลดไฟล์ birds.js เข้ามาใน app.js

```javascript:app.js
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
var birds = require('./birds')

// ...

app.use('/birds', birds)
```

## Express application generator

เราสามารถใช้ `express-generator` package สร้าง app โดยใช้ `express` พร้อมโมดูลหลักๆ ที่จำเป็นต้องใช้งานมาให้เรียบร้อย มีขั้นตอนดังนี้

1. install package: `$ npm install express-generator -g`
2. สร้าง app `$ express myapp`ซึ่งมี default view engine คือ jade ถ้าต้องการเปลี่ยน view engine สามารถใช้ option `-e` หรือ `--ejs`, `--hbs`, `--pug`
3. `$ cd myapp`
4. ติดตั้งโมดูล `$ npm install`
5. รันโปรแกรม OS X `$ DEBUG=myapp:* npm start` ส่วน Windows `$ set DEBUG=myapp:* & npm start`

## โมดูลที่แนะนำให้ใช้ร่วมกับ Express ในการทำ APIs Server

- bodyParser --> เป็น middlewares ที่เอาข้อมูลจาก body message แปลงเป็น json
- cors --> ทำให้เรียกข้าม domains ได้
- morgan --> จัดการ log
- mongoose --> ถ้าใช้ db เป็น mongodb
- pg-promise --> ถ้าใช้ db เป็น postgres
