---
title: สรุป React คืออะไรจาก codeschool
date: '2017-11-08'
tags: ['react']
draft: false
summary: 'React คือ Java Script Library (ไม่ใช่ framework) สำหรับสร้าง UI'
---

# React คืออะไร

- React คือ Java Script Library (ไม่ใช่ framework) สำหรับสร้าง UI

- ถ้าเทียบกับ MVC React คือส่วนของ View และ Controller

- React สร้างขึ้นมาเพื่อแก้ 1 ปัญหา คือ การสร้าง applications ขนาดใหญ่ ที่มีการเปลี่ยนเปลี่ยนของข้อมูลตลอดเวลา

- ใน React จะเขียน apps ในรูปแบบของ components

- Components คือ JavaScipt calls ที่สืบทอดมาจาก React.Component และต้องมี render() function

- ใช้ ReactDOM.render() function ในการ render components ใส่ใน web page

- React ใช้ Virtual DOM ซึ่งจะแสดงผลได้เร็วกว่าใช้ Browser DOM

- JSX (optional) เขียนคล้ายๆ กับ HTML tag แล้วจะถูก compile เป็น JavaScript code โดย JSX complier

ตัวอย่าง JSX

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>
  }
}

ReactDOM.render(<HelloMessage name="John" />, mountNode)
```

เมื่อ Complied To JS

```javascript
class HelloMessage extends React.Component {
  render() {
    return React.createElement('div', null, 'Hello ', this.props.name)
  }
}

ReactDOM.render(React.createElement(HelloMessage, { name: 'John' }), mountNode)
```

## ต้องรู้อะไรบ้าง

- Write React components
- Render data to the page
- Make components communicate
- Handle user events
- Capture user input
- Talk to remote servers

### Commponent-based Architecture

คือ ถ้าหน้า UI 1 หน้า มีความซับซ้อนเยอะ เราจะแตกออกเป็น component เล็กๆ ทำงานง่ายๆ ดังนั้น UI 1 หน้า คือ component ใหญ่ ที่ประกอบด้วยหลายๆ component เล็กๆ

### React Component

component ใน React จะทำงานคล้ายๆ JavaScript functions โดยมันจะสร้าง output ออกมาทุกครั้งที่ถูกเรียกใช้งาน function `render()`

React component --> Calling `render()` generates this --> Output#1 `<div><p>Hello React</p><p>10:00AM</p></div>`

React component --> Calling `render()` generates this --> Output#2 `<div><p>Hello React/<p><p>10:05AM</p></div>`

### Virtual DOM

Virtual DOM คือ in-memory representation of real DOM ที่ถูกสร้างโดย React component ก่อนที่การเปลี่ยนแปลงนั้นจะเกิดที่หน้า page

Component rendering --> Virtual DOM `<div><p>Hello React</p><p>10:00AM</p></div>` --> HTML `<div><p>Hello React</p><p>10:00AM</p></div>`

ทำไม Virtual DOM ถึงเร็วกว่า เพราะ Virtaul DOM diffing จะทำการเปลี่ยนแปลงเฉพาะส่วนที่ต่างจากเดิมเท่านั้นใน DOM จริงๆ เช่น

Component rendering #1 --> Virtual DOM `<div><p>Hello React</p><p>10:00AM</p></div>` --> HTML `<div><p>Hello React</p><p>10:00AM</p></div>`

Component rendering #2 --> Virtual DOM `<div><p>Hello React</p><p>10:05AM</p></div>` --> HTML `<div><p>Hello React</p><p>10:05AM</p></div>`

ในครั้งที่ 2 ตรง Virtual DOM จะตรวจเจอว่ามันเปลี่ยนแปลงที่ <p>10:05AM</p> ดังนั้นใน HTML จะเอา <p>10:05AM</p> ไปแทนที่ <p>10:00AM</p> เท่านั้น ส่วนอื่นจะไม่มีการไปแตะต้องเลย

### First React Component

Components ใน React คือ JavaScript classes ที่สืบทอดมาจาก React.Component base class

สร้างไฟล์ components.js

```javascript
// Component are written in upper camel case.
class StoryBox extends React.Commponent {
  // Component class inherite from a React base class
  // Every component need a render() function
  render() {
    return (
      // Call JSX
      <div>Story Box</div> // No quotes needed - don't freak out
    )
  }
}
```

ใช้ ReactDOM สำหรับ render components ใส่ใน HTML page โดยต้องระบุว่าจะให้ไป render ที่ element id ไหน

```javascript
ReactDOM.render(<StoryBox />, document.getElementById('story-app'))
```

ในหน้า HTML

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="story-app"></div>
    <!-- add libaries -->
  </body>
</html>
```

ต้อง add libaries ด้วย

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="story-app"></div>
    <script src="vendors/react.js"></script>
    <script src="vendors/react-dom.js"></script>
    <script src="vendors/babel.js"></script>
    <script type="text/babel" src="components.js"></script>
  </body>
</html>
```

index.html --> StoryBox --> ReactDOM Renderer --> Virtual DOM --> HTML (real DOM elements)

## JSX

JSX (JavaScript XML) จะคล้ายกับ HTML และมันจะถูกแปลงเป็น JavaScript code เพื่อนำไปแสดงผลบนหน้าเวบ โดย HTML elements เขียนด้วยตัวพิมพ์เล็ก แต่ถ้าเป็น React component เขียนด้วย camel case

ด้วยมันจะถูกแปลงอีกทีนึงเช่น

return (<div>Stroy Box</div>); --- Transpiled JSX Code ---> React.createElement('div', null, 'Story Box'); มันจะถูกแปลงเป็น JavaScript

เวลาใช้ class ใน JSX จะต้องเปลี่ยนเป็น className เช่น `<p className="lead">Sample paragraph</p>`

## Props

การส่งข้อมูลจาก component หนึ่ง ไปให้อีก component หนึ่ง ทำได้โดยการใช้ props

### Passing Props

```javascript
<Comment author="Somprasong Damyos" body="Great picture!" />
```

### Receiving Props

```javascript
class Comment extends React.Component {
  render() {
    return (
      <p className="comment-header">
        {this.props.author}
      </p>
      <p className="comment-body">
        {this.props.body}
      </p>
    );
  }
}
```

## Component State

ใน React จะให้วิธีการจัดการ DOM แบบ indirect DOM manipulation คือจะไม่ได้ไปแก้ไข DOM โดยตรง

เช่น การรับ event จาก user เพื่อเปลี่ยนแปลงการแสดงผล เราจะไปทำการแก้ไขที่ component state object แล้วให้ React จัดการ update DOM ให้

Event ---> Update state ---> DOM update

```javascript
render(){
  if(this.state.showComments){
    // code display comments
  }else{
    // code hiding comments
  }
}
```
