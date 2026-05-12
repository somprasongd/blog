---
title: 'JavaScript 101'
date: '2017-05-19'
tags: ['javascript']
draft: false
summary: 'สรุปพื้นฐานการเขียนภาษา JavaScript'
---

# สรุปพื้นฐานการเขียนภาษา JavaScript

ภาษา JavaScript

## Basic

เริ่มจากเรื่องพื้นฐานก่อน

### Comment

คือ ข้อความที่ใช้อธิบายเนื้อหาในซอร์สโค้ด ซึ่งมันจะไม่ถูก JavaScript engine อ่าน และประมวลผล

#### การใช้งาน

ใช้เครื่องหมาย `//` นำหน้าประโยคที่ต้องการ comment แต่ต้องเป็นบรรทัดเดียวกันเท่านั้น แต่ถ้าต้องการ comment หลายบรรทัดต้องใช้ `/* ... */` มาครอบไว้แทน

ตัวอย่าง

```javascript
var x = 1 // This is an example comment.

/* This is
an example
comment */
var y = 2
```

### Console Log

`console.log()` จะเป็น function ที่ใช้แสดงข้อความออกทางหน้า console ใช้ประโยชน์ในแง่ของการ dubug

```javascript
console.log('Hello world.')

// "Hello world."
```

> `console.warn()`, `console.error()` ใช้เหมือน `console.log()` แค่ไว้แยกประเภทข้อความที่จะแสดงออกมา

จับเวลาการทำงานของโค้ดได้จาก `console.time('xxx')` กับ `console.timeEnd('xxx')`

```javascript
console.time('do-100-loops')
for (var i = 0; i < 100; i++) {
  //
}
console.timeEnd('do-100-loops')

// do-100-loops: 0.035888671875ms
```

### Variables

Variables หรือตัวแปร มีไว้ใช้อ้างอิงตำแหน่งในหน่วยความจำที่เก็บข้อมูลเอาไว้

#### การประกาศตัวแปร

จะใช้ keyword var นำหน้าชื่อตัวแปร ซึ่งชื่อตัวแปรจะต้องขึ้นต้นด้วยตัวอักษร (a-z) จะ upper/lower ก็ได้ หรือ $ หรือ \_ แต่ best practice แนะนำให้ตั้งเป็น camelCase และให้ตั้งชื่อแบบที่ human readable

ตัวอย่าง

```javascript
var myName = 'ball'
// var --> reserved word ไว้ประกาศตัวแปร
// myName --> variable name
// = --> assignment operator ไว้กำหนดค่าให้กับตัวแปร
// 'ball' --> ค่าที่กำหนดให้กับตัวแปรชื่อ myName
```

#### ชนิดของข้อมูล \

โดยหลักๆ จะมี 2 แบบได้แก่

- Primitives Data (ข้อมูลพื้นฐาน) มี Number, Boolean, String, Symbol, null, undefined
- Object คือนอกจากแบบแรกก็คือ Object ทั้งหมด

[ Note 1] : `null` กับ `undefined` ทั้งคู่จะหมายถึงตัวแปรนั้นๆ ไม่มีค่าอะไรเก็บเอาไว้เลย แต่จะมีรายละเอียดที่แตกต่างกันคือ ถ้ามีตัวแปรที่เป็น object และไม่ต้องการอ้างถึง object นั้นอีก ก็กำหนดให้มันมีค่าเป็นแทน แต่ถ้าประกาศตัวแปรขึ้นมา และไม่ได้กำหนดค่าเริ่มต้นให้ ตัวแปรนั้นจะได้ค่าเป็น undefined แทน

[ Note 2] : ถ้าเปรียบเทียบค่าเท่ากันระหว่าง `null` กับ `undefined` ถ้าใช้ `===` จะไม่เท่ากัน แต่ถ้าใช้ `==` จะเท่ากัน

[ Note 3] : สามารถรตรวจสอบว่าชนิดข้อมูลของตัวแปรนั้นๆ เป็นอะไร โดยใช้ `typeof variable;`

```javascript
console.log(null === undefined); // false
console.log(null == undefined); // true
console.log(typeOf null); // "object"
console.log(typeOf undefined); // "undefined
```

[ Note ] : ES6 มีการประกาศตะวแปรแบบใหม่ใช้ `let` กับ `const` (หัวข้อที่ 8.1)

### String

เป็น data type ที่เก็บข้อความ โดยใช้ `""` หรือ `''` ครอบก็ได้ _(Best Practice ต้องตกลงในทีมว่าจะใช้แบบไหน)_

ตัวอย่าง

```javascript
var greeting = 'Hello world'
// หรือ
var greeting = 'Hello world'
```

**ปัญหา** กรณีที่เราจะใช้เครื่องหมาย `"` ภายในข้อความที่ครอบ `"..."` ถ้าใส่ลงไปตรงๆ จะเกิด error จะต้องใช้ Escape Character ซึ่งเป็นตัวอักษรพิเศษ `\"` แทน ในทางกลับกันถ้ามีข้อความที่ครอบด้วย `' ... '` แล้วจะใส่ `'` ลงไป จะต้องใช้ `\'`

```javascript
// กรณีืที่มีปัญหาเช่น
var greeting = 'It's great to see you!'; // error
var respone = "Billy said, "I am sick""; // error

// ต้องใช้ ESCAPE CHARACTER มาช่วย
var greeting = 'It\'s great to see you!';
var respone = "Billy said, \"I am sick\"";
```

| ESCAPE CHARACTER | Description                                       |
| ---------------- | ------------------------------------------------- |
| `\0`             | the NULL character (ค่า null มีรหัส ASCLL เป็น 0) |
| `\\'`            | เครื่องหมาย '                                     |
| `\\"`            | เครื่องหมาย "                                     |
| `\\\`            | backslash                                         |
| `\n`             | new line (ขึ้นบรรทัดใหม่)                         |
| `\r`             | carriage return                                   |
| `\v`             | vertical tab                                      |
| `\t`             | เว้นวรรคย่อหน้า ด้วยการกด tab                     |
| `\b`             | backscpace                                        |
| `\f`             | form feed (เลื่อนกระดาษไปอีก 1 หน้า)              |
| `\xXX`           | ตัวอักษรลาติน 1 ตัวอักษร                          |
| `\uXXXX`         | ตัวอักษร unicode                                  |
| `\u{XXXX}`       | ตัวอักษร unicode แบบใหม่                          |

**อื่นๆ**

- Lenght property: ใช้นับจำนวนตัวอักษรของข้อความ เช่น

```javascript
var greeting = "It's great to see you!"
greeting.length // 22
```

- String method: String ถึงเป็น primitive type ก็มี method มาให้ใช้งาน เช่น `toUpperCase();`, `trim();`, `indexOf()`, `lastIndexOf()`
- ES6 Template Literals

### Operators

ใน expressions (ประโยคที่จะถูกประมวลผลให้ได้เป็นค่าๆ หนึ่ง) 1 ตัว จะประกอบด้วย

1. Operand (ตัวถูกดำเนินการ) ได้แก่ ข้อมูล ตัวแปร หรือค่าที่รีเทิร์นจากฟังก์ชัน
2. Operator (ตัวดำเนินการ)

#### ประเภทของ Operator

- **Arithmetic Operators** คือตัวดำเนินการทางคณิตศาสตร์ ได้แก่ `*, /, %, +, -, ++, --` เช่น `var count = 10 + 5 -4; // 11`
- **Assignment Operators** คือตัวดำเนินการที่ใช้กำหนดค่าให้กับตัวแปร ได้แก่ `=, +=, -=, *=, /=, %=` เช่น `var count = 5;`
- **Comparisom Operators** คือตัวดำเนินการที่เปรียบเทียบข้อมูล 2 ตัว ซึ่งจะได้ผลลัพธ์เป็น boolean ได้แก่ `==`, `=`, `===`, `!==`, `>`, `>=`, `<`, `<=`

[ Note ] `==` คือ equal value และ `===` คือ equal value and type

```javascript
var x = 8
var y = '8'
x == y //true
x === y // false
```

- **Concatenation Operators** คือการนำ String มาต่อกัน โดยใช้ `+`

```javascript
var firstName = 'Somprasong'
var lastName = 'Damyos'
var fullName = firstName + ' ' + lastName // Somprasong Damyos
```

- **Logical Operators** คือตำวดำเนินการเปรียบลอจิก ได้แก่ `&&` (true ทั้งคู่ถึงจะ true), `||` (false ทั้งคู่ถึงจะ false), `!` (ใช้กลับลอจิก)

- **Increment (++)** เอาไว้เพิ่มค่าไป 1 มี syntax คือ `x++` หรือ `++x`

- **Decrement (--)** เอาไว้ลดค่าลง 1 มี syntax คือ `x--` หรือ `--x`

## Object

ทุกอย่างที่ไม่ใช้ primitive (`string, number, boolean, null, undefined, symbol`) ถือว่าเป็น `object` ทั้งหมด

Object จะเก็บเป็น `key/value` อยู่ภายใต้ Object Literal Natation `{}` ซึ่งจะมี properties (variables), methods (functions) หรือ object ก็ได้

การเข้าถึง Object ทำได้โดยใช้ dot notation (.) หรือ bracket notation ([])

ตัวอย่าง

```javascript
// Object Literal Natation Syntax: var object = {};
var person = {
  name: 'ball', // properties
  gender: 'male',
  age: 32,
  getInfo: function () {
    return 'Name ' + name + ', Gender ' + gender + ', Age ' + age + ' years.'
  }, // function
  extra: {
    value: 1,
  }, // object
}

// การเข้าถึง Object
// 1. ใช้ DOT NOTAION --> object.property = value;
var person2 = {}
person2.name = 'ball'
person2.gender = 'male'
person2.age = 32

// 2. ใช้ Bracket Notation --> object['property'] = value;
var person3 = {}
person3['name'] = 'ball'
person3['gender'] = 'male'
person3['age'] = 32
```

### Object Constructor Function

ถ้าต้องการสร้าง object ที่เหมือนๆ กัน ทีมี properties และ methods เหมือนกัน เราสามารถสร้างเป็น constructor โดยมันจะเสมือนพิมพ์เขียว เอาไว้สร้าง object ขึ้นมาโดยเฉพาะ

#### Syntax

`function Object() {};`

เรียกใช้โดยใช้ `new`

```javascript
// จากตัวอย่างข้างบนมี person 3 คน เหมือนกัน สร้าง constructor ได้ดังนี้
// syntax: function Object() {}
function Person(name, gender, age) {
  // ใช้ P ตัวใหญ่, ใน () คือ parameters
  this.name = name // property = value;
  this.gender = gender
  this.age = age
}

// การนำไปใช้
var person1 = new Person('ball', 'male', 32)
var person2 = new Person('john', 'male', 33)
var person3 = new Person('jane', 'female', 23)
```

### Object Prototypes

ปกติเมื่อสร้าง object จาก constructor ด้วย new แล้ว object นั้นๆ จะมี prototype มาด้วย

ซึ่ง prototype มันจะคล้ายๆ พิมพ์เขียวที่เอาไว้ให้ object อื่นๆ สามารถเข้าถึง properties กับ methods ของมันได้

> prototype ก็คือ object

ตัวอย่าง

```javascript
function Car(color){
  this.color = color;
}

Car.prototype.drive = function() {
  console.log("Drive a " + this.color + " car");
}

var redCar = new Car('red');
redCar.drive(); // "Drive a red car"

var buleCar = new Car('bule');
buleCar.drive(); // "Drive a red car"

// เมื่อใช้ new สร้าง redCar ขึ้นมาจาก Car ทำให้ redCar มี prototype เป็น Car.prototype
console.log(Object.getPrototypeOf(redCar) === Car.prototype); // true

// ถ้าต้องการตรวจสอบว่า object นั้นถูกจากมาจาก constructor function นั้น หรือไม่ ใช้ instanceOf
console.log(redCar instanceOf Car); // true
```

## Array

Array เป็นข้อมูลแบบ object ชนิดหนึ่ง แต่มันใช้สำหรับเก็บค่าหลายๆ ค่า (ซ้ำกันได้) เป็นชุดข้อมูล ซึ่งจะเก็บอยู่ใน `[]` และค่าแต่ละตัวแยกด้วย `,`

ตัวอย่าง

```javascript
// ค่าแต่ละตัว เรียกว่า Elements
// ค่าแต่ละตัวจะมีการอ้างอิงตำแหน่งเริ่มจาก 0 เรียกว่า INDEX
var testScores = [72, 84, 68, 92, 74]

// elements แต่ละตัวใน array ไม่จำเป็นต้องมีชนิดข้อมูลเดียวกันก็ได้
var fishTank = ['glass', 10, 'gold fish', true]

// การใช้งาน
fishTank[0] //'glass'
fishTank[1] // 10

// เทียบกับ object
var fishTank = {
  material: 'glass',
  gallons: 10,
  fishType: 'gold fish',
  hasWater: true,
}

fishTank.material //'glass'
fishTank.gallons // 10
```

### Array Method

Method รูปแบบ [].methods(); แต่ถ้าไม่มี () จะเป็น properties เช่น [].length;

- `pop();` --> ดึงค่าตัวสุดท้ายออกจาก array
- `push();` --> เพิ่มค่าต่อท้าย array
- `shift();` --> ดึงค่าตัวแรกออกจาก array
- `unshift();` --> เพิ่มค่าไปต่อหน้า array
- `concat();` --> เอาไว้เชื่อม array 2 ตัว หรือมากกว่า เข้าด้วยกัน
- `reverse();` --> ไว้ reverse order of elements
- `sort();` --> default จะเรียงตาม alphabet (a-z)
- `slice();` --> จะคืนค่า array ที่ตัดแล้วออกมา โดยที่ไม่ได้ลบใน array ตัวเดิม มี parameter 2 ตัว ตัวแรกเป็น index ที่เริ่มเอาข้อมูล ตัวที่ 2 เป็น index สิ้นสุด (ไม่รวม index นี้)

ตัวอย่าง

```javascript
// [].methods()
var testScores = [72, 84, 68, 92, 74]

// stacks --> last in first out (LIFO)
testScores.pop()
testScores // [72, 84, 68, 92]

testScores.push(13)
testScores // [72, 84, 68, 92, 13]

testScores.push(55, 66, 77)
testScores // [72, 84, 68, 92, 13, 55, 66, 77]

// queues first in first out (FIFO)
testScores.shift()
testScores // [84, 68, 92, 13, 55, 66, 77]

var firstItem = testScores.shift()
firstItem // 84

testScores.unshift(77, 72)
testScores // [77, 72, 68, 92, 13, 55, 66, 77]

// syntax: array1.concat(array2, array3);
var bigDog = ['golden retriever', 'St. berrnard', 'german shepherd', 'bernese mountain dog']

var littleDog = ['terrier', 'weiner dog', 'corgie', 'pomeranian']

var allDogs = bigDog.concat(littleDog)
allDogs // ['golden retriever', 'St. berrnard', 'german shepherd', 'bernese mountain dog', 'terrier', 'weiner dog', 'corgie', 'pomeranian']

// reverse();
var reverseDogs = allDogs.reverse()
reverseDogs // ['pomeranian', 'corgie', ..., 'golden retriever']

// sort();
var alphaOrder = allDogs.sort()
alphaOrder // ['bernese mountain dog', 'corgie', 'german sheperd', ...]

// slice();
allDogs.slice(1, 4) // ['St. berrnard', 'german shepherd', 'bernese mountain dog']
allDogs.slice(-3, -1) // ['weiner dog', 'corgie']
allDogs.slice(3) // ['bernese mountain dog', 'terrier', 'weiner dog', 'corgie', 'pomeranian']
```

## Functions

Functions คือโปรแกรมย่อย ที่รวมเอาคำสั่งของโปรแกรม (statements) ที่ทำงานซ้ำๆ กัน มาอยู่จุดเดียวกัน แล้วเรียกใช้งานผ่านฟังก์ชันทีเดียว สามารถ resue ได้ ไม่ต้องเขียนใหม่ ทุกๆ ครั้งที่จะใช้งาน

### การประกาศฟังก์ชัน

```javascript
function functionaName(param1, param2, ..., paramN) {
  return [value]; // optional
}
```

> ไม่มี semicolon

ตัวอย่าง

```javascript
function calculate(param1, param2) {
  return param1 * param2
}

// การเรียกใช้งาน
var result = calculate(2, 10)
console.log(result) // 20
```

### Anonymous Functions

คือการประกาศฟังก์ชันโดยตัดชื่อฟังก์ชันออก `function (param1, param2, ..., paramN) { return [value]; // optional}`

ตัวอย่าง

```javascript
// function expression
var calculate = function (param1, param2) {
  return param1 * param2
}

// การเรียกใช้งาน
console.log(calculate(2, 10)) // 20

// เนื่องจาก calculate เป็นตัวแปร ดังนั้นสามารถแก้ไขค่าได้
calculate = 100
console.log(calculate) // 100
```

### IIFE (Immediately Invoked Function Expressions)

คือฟังก์ชันที่เรียกใช้งานทันที โดยการใส่ `()` ต่อท้ายฟังก์ชัน เพื่อเรียกใช้งานฟังก์ชันทันที และใส่ `(...)` ครอบไว้ซึ่งคือการทำ Wrapped Function

ตัวอย่าง

```javascript
var calculate = (function (param1, param2) {
  return param1 * param2
})(2, 10)

// การเรียกใช้งาน
console.log(calculate) // 20

// เปรียบเทียบกับการประกาศฟังก์ชันแบบปกติ
var greeting1 = function () {
  return 'Hello, everyone!'
}
// ต้องใส่ () ต่อท้ายด้วย
console.log(greeting1()) // "Hello, everyone!"
// IIFE
var greeting2 = (function () {
  return 'Hello, everyone!'
})()
// เรียกใส่งานได้เลยไม่ต้อใส่ ()
console.log(greeting2) // "Hello, everyone!"
```

### Scope

ใน JavaScript จะมองเห็นตัวแปรอยู่ 2 แบบ คือ

1. Local Scope: ตัวแปรที่ประกาศอยู่ในฟังก์ชัน ถูกเข้าถึงได้เฉพาะในฟังก์ชันเท่านั้น
2. Global Scope: ตัวแปรที่ประกาศอยู่นอกฟังก์ชัน ถูกมองเห็นได้จากทุกๆ ที่

> [Note 1] สามารถตัวชื่อตัวแปรแบบ Local ซ้ำกับ Global ได้

> [Note 2] ตัวแปรแบบ Global ทั้งหมดใน browser จะกลายเป็นตัวแปรของ Global Object `window` แต่ถ้าใช้ใน Node.js จะกลายเป็น Global Object ชื่อ `global`

ตัวอย่าง

```javascript
var scope = 'public'
function checkScope() {
  var scope = 'private'
  console.log(scope)
}

checkScope() // "private"
console.log(scope) // "public"
```

### Closure Function

คือการทำฟังก์ชันชันซ้อนฟังก์ชัน และมันจะจดจำว่าพื้นที่ได้ว่า ฟังก์ชันนั้นๆ เคยอยู่ภายใต้ฟังก์ชันหลักตัวใดมาก่อน เพื่อทำให้สามารถเข้าถึงตัสแปรที่ประกาศอยู่ในฟังก์ชันหลักได้ แม้ว่าฟังก์ชันหลักจะจบการทำงานไปแล้ว แต่ฟังก์ชันหลักจะไม่เห็นตัวแปรที่อยู่ในฟังก์ชันที่อยู่ภายใต้มันเลย

ตัวอย่าง

```javascript
// global scope
var height = 10

function volume() {
  // parent scope
  var width = 10
  var length = 10
  var volumeOfObject = function () {
    // child scope
    return length * width * height
  }
  // return value of function expression volumeOfObject
  return volumeOfObject()
}

volume() // 1000
```

### Hoist

คือการประกาศฟังก์ชัน และการประกาศตัวแปร แบบ `var` มันจะลอยขึ้นไปประกาศอยู่ข้างบนสุดของขอบเขต (scope) ของมัน ถ้าเป็นตัวแปรเมื่อย้ายไป จะไม่มีค่าเริ่มต้นกำหนดไป

- การประกาศตัวแปรแบบ `var` จะเป็นแบบ function scope
- การประกาศตัวแปรแบบ `let` กับ `const` จะเป็นแบบ block scope จะไม่ลอยไปอยู่ข้างบนสุด แต่ scope เริ่มจากจุดที่ประกาศใช้งาน จนถึงเส้นทางที่โปรแกรมทำงานเสร็จ เมื่อออกจาก block ไปแล้วตัวแปรก็จะตายลง

ตัวอย่าง

```javascript
// ตัวอย่าง function
// มองเห็นฟังก์ชันก่อนประกาศใช้งาน
myFunction() // "Hoisted"

function myFunction() {
  // มันจะย้ายไปอยู่บรรทัดแรก
  console.log('Hoisted')
}

myFunction() // "Hoisted"

// การประกาศตัวแปรแบบ var
function myFunction() {
  // สามารถมองเห็นตัวแปร value
  console.log(value) // undefined
  if (true) {
    var value = 100
    console.log(value) // 100
  }
  console.log(value) // 100
}

// เนื่องจาก javascript มันแปลงโค้ดไปเป็นแบบนี้
function myFunction() {
  var value // hositing
  console.log(value) // undefined
  if (true) {
    value = 100
    console.log(value) // 100
  }
  console.log(value) // 100
}

// การประกาศตัวแปรแบบ let และ const
function myFunction() {
  console.log(value) // ReferanceError เนื่องจากตัวแปร value มันจะถูกประกาศอยู่ใน if block เท่านั้น
  if (true) {
    let value = 100 // scope เริ่มจากจุดที่ประกาศใช้งาน
    console.log(value) // 100
  }
  console.log(value) // ReferanceError
}
```

## Loops & Conditionals

- Loops คือ การตรวจสอบเงื่อนไข ถ้าเป็น true จะทำงานใน code block โดยจะทำซ้ำจนกว่าเงื่อนไขจะเป็น false
- Condition คือ ตัวตัวสินใจว่าจะทำงาน หรือข้ามการทำงานไป ขึ้นอยู่กับค่าของ expression นั้นๆ
- ค่าจะเป็นเท็จเมื่อ `(false);, (0);, ('');, (null);, (undefined);, (NaN);` นอกนั้นจะเป็นจริง
- `==` คือการเปรียบเทียบค่า ส่วน `===` เปรียบทั้งค่า และ type

> กลับไปดู Logical Operators

### Control Statement

#### IF Statement

เอาไว้เลือกเส้นทางการทำงาน

- IF --> ถ้า expression เป็นจริงจะทำงานใน code block ถ้าไม่จะข้ามไป
- ELSE --> ใช้ร่วมกับ `if` ถ้าไม่ทำงานใน code block ของ if จะมาทำงานใน `else` แทน
- ELSE IF --> กรณีที่มีเงื่อนไขมากกว่า 1 ก็ใช้ else if มาตรวจสอบเพิ่มเติมได้

```javascript
// if
if (5 > 6) {
  // if true, run code here
  console.log('true condition')
  // if false, do not run this code block
}

// no code run

// else if
var testScore = 88
if (testScore > 90) {
  console.log('You got an A!')
} else if (testScore > 80) {
  console.log('You got a B!')
} else if (testScore > 70) {
  console.log('You got a C!')
} else {
  console.log('You failed')
}
```

#### Switch Statement

เอาไว้เลือกเส้นทางการทำงาน ที่ตรงตาม `case` ต่างๆ โดยจะทำงานไปจนกระทั่งเจอ `break;` (ถ้ามี) ก็จะจบการทำงานของ `switch` หรือถ้าไม่ตรงตาม `case` ใดเลยก็จะข้ามไปทำงานใน `default`

- Syntax

```javascript
switch (expression) {
  case x:
    // code block;
    break
  case y:
    // code block;
    break
  default:
  // code block;
}
```

### Loops

#### ประโยคคำสั่ง while

หลักการทำงาน คือ เมื่อ condition เป็น true จะเข้ามาทำงานใน code block ของ while จนเสร็จ แล้ววนกลับมาตรวจสอบเงื่อนไขอีกครั้ง จนกว่าเงื่อนไขจะเป็น false จึงจะไม่เข้ามาทำงานใน while และจบการทำงานของ while

- **Syntax:**

```javascript
while (condition) {
  statement
}
```

- **ตัวอย่าง:**

```javascript
var i = 0
while (i < 3) {
  console.log(i++)
}
/* result
0
1
2 */
```

#### ประโยคคำสั่ง do..while

**หลักการทำงาน** คือ ครั้งแรกโปรแกรมจะเข้ามาทำงานใน do ก่อรเสมอ เมื่อทำงานเสร็จถึงจะไปตรวจสอบ while(condition) ทีหลัง ซึ่งถ้าเป็น true ก็จะวนกลับไปทำงานใน do อีกครั้ง จนกว่าเงื่อนไขจะเป็น false จึงจะไม่เข้ามาทำงานใน do และจบการทำงานของ do...while

- **Syntax:**

```javascript
do {
  statement
} while (condition)
```

- **ตัวอย่าง:**

```javascript
var i = 0
do {
  console.log(i++)
} while (i < 3)
/* result
0
1
2 */
```

#### ประโยคคำสั่ง for

ไว้ใช้วนลูปเหมือนกัน แต่สามารถกำหนดจำนวนรอบการวนลูปได้

- **Syntax:**

```javascript
for ([expr1]; [expr2]; [expr3]) {
  statement
}

// expr1 --> ใช้ประกาศค่าเริ่มต้นให้กับตัวแปร เพื่อใช้ในการนับจำนวนลูป
// expr2 --> ไว้ตรวจสอบว่าโปรแกรมวนลูปได้ครบตามจำนวนที่ต้องการแล้วหรือยัง ถ้าเป็นจริงจะเข้าไปทำงานใน for ถ้าไม่ก็จะจบการทำงานของ for
// expr3 --> เมื่อโปรแกรมทำงานคำสั่งสุดท้ายใน for เสร็จจะกลับมาที่ expr3 เพื่อใช้แก้ไขค่าของตัวนับใน expr1 จากนั้นก็จะไปตรวจสอบใน expr2 ใหม่อีกครั้ง
```

- **ตัวอย่าง:**

```javascript
for (var i = 0; i < 3; i++) {
  console.log(i)
}
/* result
0
1
2 */
```

#### ประโยคคำสั่ง for..in

หลักการทำงาน คือ เป็นรูปแบบการวนลูป ที่มีไว้เข้าถึงชื่อคีย์ใน object

- **Syntax:**

```javascript
for (variable in obj) {
  statement
}
```

- **ตัวอย่าง:**

```javascript
function Person(name, gender, age) {
  this.name = name
  this.gender = gender
  this.age = age
}
var person = new Person('ball', 'male', 32)
for (var key in person) {
  console.log(key + ' : ' + person[key])
}
/* result
"name : ball"
"gender : male"
"age : 32" */
```

#### ประโยคคำสั่ง for...of (ES6)

หลักการทำงาน คือ เอาไว้ช่วยเขียนโปรแกรมวนลูป เพื่อเข้าถึงสมาชิกจาก object ที่วนซ้ำได้ตัว(มี method @@iterator อยู่ภายใน) เช่น Array, String, Set, Map

- **ตัวอย่าง:**

```javascript
// array
for (let i of [1, 3, 5]) {
  console.log(i)
}
/* result
1
3
5 */

// String
for (let i of 'hello') {
  console.log(i)
}
/* result
h
e
l
l
o */
```

#### ประโยคคำสั่ง continue

หลักการทำงาน คือ `continue` เอาไว้ใช้ในลูป เพื่อกระโดดข้ามการทำงานของประโยคคำสั่งที่เหลือ แล้วไปทำงานรอบถัดไปของลูปแทน

- **ตัวอย่าง:**

```javascript
for (var i = 0; i < 3; i++) {
  if (i <= 1) {
    continue
  }
  console.log(i)
}
/* result
  2 */
```

#### ประโยคคำสั่ง break

หลักการทำงาน คือ break จะเอาไว้ใช้ในลูป เพื่อยุติการวนลูป

- **ตัวอย่าง:**

```javascript
for (var i = 0; i < 3; i++) {
  if (i == 2) {
    break
  }
  console.log(i)
}
/* result
  0
  1 */
```

#### ประโยคคำสั่ง lable

หลักการทำงาน คือ เป็นการตั้งชื่ออะไรก็ได้ แล้วตามด้วยเครื่องหมาย `:` ซึ่งมันจะใช้ร่วมกับ `continue` หรือ `break` เพื่อกระโดดข้ามไปยังบรรทัดที่ label ไว้

- **ตัวอย่าง:**

```javascript
// ตัวอย่าง.ช้ lable กับ continue;
outer: for (var i = 0; i < 2; i++) {
  console.log('i: ' + i)
  for (var j = 0; j < 3; j++) {
    if (j == 1) {
      continue outer
    }
    console.log('j: ' + j)
  } // จบการทำงาน for
} // จบการทำงาน outer: for
/* result
  "i: 0"
  "j: 0"
  "i: 1"
  "j: 0" */

// ตัวอย่างใช้ lable กับ break;
outer: while (true) {
  for (var i = 0; i < 3; i++) {
    if (i == 1) {
      break outer
    }
    console.log('i: ' + i)
  } // จบการทำงาน for
} // จบการทำงาน outer: while

// result
// "i: 0"
```

## this, bind(), call(), apply()

`this` คือ pointer ที่ชี้ไปยัง object ที่อยู่ในหน่วยความจำ ทำให้สามารถใช้ `this` เข้าถึง properties และ method ภายใน object นั้นๆ ได้ทั้งหมด แต่ `this` มันจะผูกไว้กับ object ตัวใดตัวหนึ่ง ในขณะที่โปรแกรมทำงานเท่านั้น

- ตัวอย่าง

```javascript
var obj = {
  foo: function () {
    this.a = 1 // this สามารถใช้สร้างตัวแปรเพิ่มเข้าไปใน object ได้ด้วย
    console.log(this.a) // ใช้ this เรียกใช้งาน property อื่นใน object นี้ได้
  },
  bar: function () {
    this.foo() // ใช้ this เรียกใช้งาน method อื่นใน object นี้ได้
  },
}

obj.foo() // 1
obj.bar() // 1
console.log(obj.a) // 1
```

`this` สามารถใช้งานใน function ธรรมดา ได้ด้วยซึ่งค่าของ `this` จะเป็นดังนี้

1. ถ้าอยู่ในโหมดสตริคท์ (ใช้ "use strict") `this` จะมีค่าเป็น `undefined`
2. ถ้าไม่ใช่ `this` จะชี้ไปยัง Global Object แทน (browser --> `window` ส่วน nodejs --> `global`)

```javascript
var number = {
  x: 11,
  y: 22,
}

var count = function () {
  console.log(this.x + this.y) // ใช้งาน this ในฟังก์ชันธรรมดา
}

count() // Nan เนื่องจากไม่มีค่า x, y
```

จากตัวอย่างข้างบนสามารถเปลี่ยนค่า `this` ให้ชี้ไปยัง object ตัวอื่น ระหว่างที่โปรแกรมทำงาน โดยใช้ `call()`, `apply()`, `bind()`

method `call()` และ `apply()` เป็นการเรียกใช้งานฟังก์ชัน โดยการส่ง object ที่จะใช้ this อ้างอิงไป และตัวค่าอาร์กิวเมนต์ที่ฟังก์ชันั้นๆ ต้องการ โดยความต่างระหว่าง `call()` กับ `apply()` คือวิธีการส่งค่าอาร์กิวเมนต์ โดยที่ `call()` จะส่งค่าเดี่ยวๆ ไปแยกด้วย `,` แต่ `apply()` จะส่งเป็น Array

method `bind()` จะคล้ายๆ `call()` แต่ต่างกันที่ `bind()` จะไม่เรียกใช้งานฟังก์ชันทันที แต่จะรีเทิร์นกลับออกมาแทน

- **Syntax**

```javascript
func.call(thisObj, arg1, arg2, arg3)

func.apply(thisObj, argsArray)

var bindFunc = func.bind(thisObj, arg1, arg2, arg3)
```

- ตัวอย่าง

  ```javascript
  var number = { num: 2 }

  function add(x, y) {
    console.log(this.num + x + y)
  }

  add.call(number, 5, 8) // 15

  add.apply(number, [5, 8]) // 15

  var addBind = add.bind(number, 5, 8)
  addBind() // 15
  // หรือ
  add.bind(number, 5, 8)() // 15
  ```

## Error & Exception Handeling

เมื่อเกิด error ขึ้นมาที่บรรทัดใดก็ตาม โปรแกรมจะหยุดการทำงานทันที แต่มีวิธีจัดการกับ error นั้นๆ ได้โดยที่ยังให้โปรแกรมสามารถทำงานต่อได้ตามปกติ โดยการใช้ `try ... catch`

- **รูปแบบ**

```javascript
// แบบที่ 1
try {
  // โค้ดที่อาจมี error เกิดขึ้นได้
} catch (e) {
  // จัดการกับ error
}

// แบบที่ 2
try {
  // โค้ดที่อาจมี error เกิดขึ้นได้
} catch (e) {
  // จัดการกับ error
} finally {
  // สุดท้ายไม่ว่าจะเกิด error หรือไม่ก็ตามก็ต้องมาทำงานที่นี่เป็นลำดับสุดท้ายเสมอ
}

// แบบที่ 3
try {
  // โค้ดที่อาจมี error เกิดขึ้นได้
} finally {
  //
}
```

หลักการทำงาน คือ

1. ใช้ `try {}` ครอบโค้ดส่วนที่คาดว่าจะเกิด error
2. ใช้ `catch(e) {}` ถัดจาก `try{}` เพื่อจัดการกับ error ที่เกิดขึ้น
3. ถ้าปิดท้ายด้วย `finally{}` โปรแกรมจะมาทำงานในนี่ก่อนออกจาก `try ... catch` ไม่ว่าจะเกิด error ขึ้นหรือไม่ก็ตาม

- ตัวอย่าง

```javascript
try {
  console.log(x); // เกิด error ตรงนี้
  x++; // ตรงนี้ไม่ทำงานเพราะข้ามไปจัดการ error ใน catch แล้วออกไปเลย
}catch(e) {
  console.log(typeOf e); // "object"
  console.log(e.message); // "x is not defined"
  console.log(e.name); // "ReferanceError"
}

console.log("Last statement");

/* Result
"object"
"x is not defined"
"ReferanceError"
"Last statement" */

try {
  throw "This is an error"; // ใช้ throw เพื่อโยน exception ออกมาเอง
  console.log("This is try"); // ไม่แสดงเพราะออกจาก try เข้า catch แล้ว
}catch (e) {
  console.log(e); // "This is an error"
}finally {
  console.log("This is finally"); // ต้องทำทำงานที่นี่ก่อนออกจากโปรแกรมเสมอ
}

console.log("Last statement");

/* Result
"This is an error"
"This is finally"
"Last statement" */

function foo(){
  try{
    return "This is try";
  }finally {
    console.log("This is finally"); // ก่อนจะ return ออกไปต่องมาทำงานในนี่ก่อนเสมอ
  }
}
console.log(foo());

/* Result
"This is finally"
"This is try" */
```

## JavaScript ES6

ภาษา JavaScript เวอร์ชันใหม่ ECMAScript 2015 หรือเรียกว่า ES6 นั้นได้เพิ่มความสามารถมีหลายอย่าง ซึ่งส่วนที่ใช้งานบ่อยๆ มีดังนี้

### Automatic semicolon insertion

ภาษา JavaScript ยังต้องใส่ semicolon แต่ใน ES6 ถ้าไม่ใส่มันจะใส่ให้อัตโนมัติ

### การประกาศตัวแปรด้วย let

ใช้เหมือนการประกาศตัวแปรด้วยว่า แต่มีข้อแตกต่างดังนี้

- `var` เป็น function scope แต่ `let` เป็น block (`{}`) scope ตัวอย่าง

```javascript
var count = 4
if (true) {
  var more = 1
}
console.log(count + more) // 5

let count = 4
if (true) {
  let more = 1
}
console.log(count + more) // error more undefined
```

- การใช้ `let` ใน `for loop` รวมถึง `for...in` กับ `for...of` ในแต่ละรอบจะเป็นการสร้างตัวแปรขึ้นมาให้ และกำหนดค่าเริ่มต้นใหม่ให้ทุกรอบ ส่วน var จะเป็นตัวแปรเดียวกันทุกรอบ

```javascript
var array = [];
for(var i = 0; i < 3; i++){
  array.push(function(){ console.log(i) });
}
array.forEach(function(printLog)){
  printLog();
}
/* Result
5
5
5
*/

var array = [];
for(let i = 0; i < 3; i++){
  array.push(function(){ console.log(i) });
}
array.forEach(function(printLog)){
  printLog();
}
/* Result
0
1
2
*/
```

- ตัวแปร `let` จะถูกมองเห็นตั้งแต่จุดที่ประกาศ ไม่ลอยไปอยู่บนสุดแบบ var
- ดังนั้นจะอ้างถึงตัวแปร `let` ก่อนประกาศไม่ได้
- ประกาศชื่อตัวแปร `let` ซ้ำกันไม่ได้ ภายใน scope เดียวกัน ไม่สนใจว่าจะเป็นตัวแปรแบบ `var/let/const` แต่คนละ scope สามารถทำได้ เรีกยว่า TDZ (Temporal Dead Zone)

### การประกาศตัวแปรด้วย const

คือ การประกาศตัวแปรเป็นค่าคงที่ คือต้องกำหนดค่าเริ่มต้นตั้งแต่ประกาศตัวแปรครั้งแรก และไม่สามารถแก้ไขค่าภายหลังได้ ส่วนอื่นก็จะเหมือน let ทุกประการ

ถึงจะการประกาศ object เป็นเป็นค่าคงที่ แต่ยังสามารถแก้ไขข้อมูลภายในของ object ได้ (แต่สามารถใช้ Object.freeze({}); เพื่อไม่ให้เปลี่ยนใส่ใน Object ได้ แต่ก็กันได้แค่ระดับชันเดียวเท่านั้น ถ้ามี object ข้างใน object ตัวนั้นก็ยังสามารถเปลี่ยนแปลงค่าข้างตัวมันได้อยู่)

### Template String

เวลาสร้างข้อความจะใช้เครื่องหมาย back-ticks (ตัวอักษร grave accent `)

สามารถแทรกตัวแปรลงไปในข้อความได้เลย โดยใช้ `${variable}`

สามารถแทรก expression ลงไปในข้อความได้เลย `${expression}`

รองรับ multi-line กด enter ได้เลย ไม่จำเป็นต้องใส่ `\n` แต่จะใช้ `\n` เหมือนเดิมก็ได้

เวลาใช้ `.length` เคาะ enter 1 ครั้ง เท่ากับ 1 ตัวอักษร spacebar 1 ครั้ง เท่ากับ 1 ตัวอักษาร

สามารถใส่ `"`, `'` ลงไปได้เลย ไม่ต้อง `\"`, `\'`

```javascript
let name = 'Ball'
let msg = `My name's 
"${name}".`
console.log(msg)
/* Result
"My name's
"Ball""*/

let a = 3.25,
  b = 10.5
console.log(`Price $${(a * b).toFixed(2)}`) // Price $34.13
```

### Arrow Functions

ตัวคำว่า `function` ออกไปตอนประกาศฟังก์ชัน เพื่อลดโค้ดให้เหลือแค่ประกาศพารามิเตอร์ ตามด้วย `=>` ต่อท้ายด้วย `{}`

```javascript
// ES 5
var es5Func = function(value) {
  return value;
}
console.log(es5Func(123)) // 123

// ES6
let es6Func = (value) => {
  return value;
}
console.log(es6Func(123)) // 123

// แต่ถ้ามีพารามิเตอร์แค่ 1 ตัว ไม่ต้องใส่ () ก็ได้ และถ้าทำงานแค่ return ออกมา หรือทำงานบรรทัดเดียวก็ไม่ต้องใส่ {}
let arrowFunc = value => value;
console.log(arrowFunc(123)) // 123

// แต่ถ้าไม่มีพารามิเตอร์ต้องใส่ ()
let arrowFunc2 = () => console.log('Hello arrow fuction');
arrowFunc2(); // "Hello arrow fuction"

// ฟังก์ชันเปล่า
let arrowFunc3 = () => {};

// ถ้ารีเทิร์นเป็น object ต้องใส่ {} ครอบไว้เสมอ ไม่ใส่จะเกิด error
let arrowFunc4 = () = { {a:3, b:"abc"} };

// ตัวอย่างใช้ arrow function return arrow function
const log = level => message => console.log(`${level}: ${message}`);
/*เหมือนกับการเขียนแบบนี้
function log(level){
    return function(message){
        console.log(`${level}: ${message}`);
    }
}
*/
const debugLevel = log('DEBUG');
debugLevel('Test'); // DEBUG: Test
```

- ความแตกต่างกับฟังก์ชันแบบธรรมดา
  - ฟังก์ชันลูกศรไม่สามารถเรียกใช้งานออปเจ๊กต์ `aguments` ได้ แต่สามารถใช้ออปเจ๊กต์ `aguments` ของฟังก์ชันธรรมดาที่ครอบตัวมันได้
  - ถ้าฟังก์ชันลูกศรอยู่ภายใต้ฟังก์ชันธรรมดา ค่า this ของฟังก์ชันลูกศร ก็คือ this อันเดียวกันกับฟังก์ชันด้านนอก
  - this ในฟังก์ชันลูกศรไม่สามารถเปลี่ยนแปลงได้ แต่ยังใช้ call() apply() และ bind() เหมาะกับการเอามาสร้างเป็น callback function
  - ฟังก์ชันลูกศรไม่สามารถเอาไปใช้เป็น function constructor ได้ ก็คือใช้ new สร้างออฟเจ๊กต์ไม่ได้

[ Note ] ไม่ควรใช้เมื่อต้องการใช้ `this` และ `arguments` หรือใช้สร้าง function ใน object

### Rest Parameters

คือ การประกาศพารามิเตอร์แค่ตัวเดียว แต่สามารถรับค่าอากิวเมนต์ได้หลายตัว และต้องวางมันไว้ต่อท้ายพารามิเตอร์ตัวอื่นๆ เท่านั้น

```javascript
let iterateItem = (item, ...last) => {
  console.log(item)

  let result = 0
  let len = last.length
  for (let i = 0; i < len; i++) {
    result += last[i]
  }
  console.log(result)
}

iterateItem(1, 2, 3, 4, 5, 6)

/* Result
1
20
*/
```

### Spread Operator

เอาไว้กระขายข้อมูลภายในของออฟเจ็กต์ที่วนซ้ำได้ เช่น Array String เป็นต้น

```javascript
// Math.max() จะรับค่าอากิวเมนต์กี่ตัวก้ได้ แต่จะไม่รับ array
// ถ้าต้องการส่งค่าจาก array ไป ต้องใช้ spread operator ช่วย
let vals = [100, 33, -55, 299, 44, 231]
console.log(Math.max(...vals)) // 299
// เหมือนกับการเขียน console.log(Math.max(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5]));
```

### Object: การใช้พร็อพเพอร์ตี้แบบย่อ

โดยปกติใน javascript ข้อมูลในออฟเจ็กต์สามารถกำหนดค่าด้วยแปร ซึ่งชื่อตัวแปรสามารถซ้ำกับคีย์ได้ ดังนั้นใน ES6 สามารถเขียนให้กระชับขึ้นได้โดย ใช้แค่ชื่อคีย์เพียวตัวเดียว ตัดเครื่องหมาย : กับข้อมูลทิ้งไป

```javascript
let color = 'red'
let size = 20

let fontES5 = {
  color: color,
  size: size,
  myFunc: function (param) {
    console.log('Param: ' + param)
  },
}
console.log(fontES5.color) // "red"
console.log(fontES5.size) // 20
fontES5.myFunc('abc') // "Param: abc"

let fontES6 = {
  color,
  size,
  myFunc(param) {
    console.log(`Param: ${param}`)
  },
}
console.log(fontES6.color) // "red"
console.log(fontES6.size) // 20
fontES6.myFunc('abc') // "Param: abc"
```
