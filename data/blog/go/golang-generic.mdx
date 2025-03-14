---
title: 'ทำความรู้จักกับ Generic ในภาษา Go'
date: '2025-02-07'
tags: ['go']
draft: false
summary: 'สร้างฟังก์ชันและโครงสร้างข้อมูลที่รองรับชนิดข้อมูลหลายแบบ (type-agnostic) โดยไม่ต้องทำซ้ำโค้ด'
---

# ทำความรู้จักกับ Generic ในภาษา Go

## พื้นฐานของ Generics ใน Go

Generics เป็นความสามารถที่เพิ่มเข้ามาใน Go ตั้งแต่เวอร์ชัน 1.18 ช่วยให้สามารถสร้างฟังก์ชันและโครงสร้างข้อมูลที่รองรับชนิดข้อมูลหลายแบบ (type-agnostic) โดยไม่ต้องทำซ้ำโค้ด

ก่อนหน้าที่จะมี Generics การสร้างฟังก์ชันที่รองรับหลายชนิดข้อมูลต้องใช้ `interface{}` ซึ่งขาดความปลอดภัยในการตรวจสอบประเภท (type-safety) ในขณะคอมไพล์

ตัวอย่างการใช้ `interface{}` แบบเดิม:

```go
package main

import (
    "fmt"
    "time"
)

func Sum(values []interface{}) int {
    var total int
    for _, v := range values {
        total += v.(int) // การแปลงประเภททำให้ช้าลง
    }
    return total
}

func main() {
    values := make([]interface{}, 1000000)
    for i := 0; i < 1000000; i++ {
        values[i] = i
    }

    start := time.Now()
    fmt.Println("Sum:", Sum(values)) // เกิด panic ได้ถ้าไม่ใช่ int
    fmt.Println("Duration:", time.Since(start))
}
```

### ปัญหาของการใช้ `interface{}`

1. **ไม่มี Type-safety**: ต้องแปลงประเภทเองเมื่อใช้งาน
2. **ประสิทธิภาพต่ำกว่า**: มี Overhead จากการแปลงประเภท

## การสร้างและใช้งาน Generic Function และ Generic Type

### Generic Function

สามารถสร้างฟังก์ชันที่รองรับหลายประเภทข้อมูลด้วย Type Parameter โดยใช้เครื่องหมาย `[]` กำหนดชื่อประเภท

ตัวอย่าง: ฟังก์ชัน `Sum` ที่รวมค่าของ slice:

```go
package main

import "fmt"

// T คือ Type Parameter ที่รองรับ int และ float64
func Sum[T int | float64](nums []T) T {
    var total T
    for _, num := range nums {
        total += num
    }
    return total
}

func main() {
    fmt.Println(Sum([]int{1, 2, 3}))       // 6
    fmt.Println(Sum([]float64{1.5, 2.5})) // 4.0
}
```

**คำอธิบาย**:

- `T` เป็นตัวแทนของประเภท (type parameter)
- `T int | float64` กำหนดข้อจำกัด (constraint) ว่า `T` ต้องเป็น `int` หรือ `float64`

### Generic Type

สามารถสร้างโครงสร้างข้อมูล (struct) ที่รองรับหลายประเภทได้

ตัวอย่าง: กล่องเก็บข้อมูลแบบ Generic:

```go
package main

import "fmt"

type Box[T any] struct {
    Value T
}

func main() {
    intBox := Box[int]{Value: 100}
    strBox := Box[string]{Value: "Hello"}

    fmt.Println(intBox.Value) // 100
    fmt.Println(strBox.Value) // Hello
}
```

**คำอธิบาย**:

- `Box[T any]` คือโครงสร้างที่รองรับทุกประเภท (`any` คือ type constraint ที่รองรับทุกชนิดข้อมูล)

### การใช้ Constraint เพื่อจำกัดประเภท

สามารถกำหนดข้อจำกัดของประเภทด้วย `interface`

ตัวอย่าง: ฟังก์ชัน `Max` ที่คืนค่ามากที่สุด:

```go
package main

import "fmt"

type Ordered interface {
    int | float64 | string
}

func Max[T Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(Max(5, 10))         // 10
    fmt.Println(Max(3.5, 2.8))     // 3.5
    fmt.Println(Max("Go", "Golang")) // Golang
}
```

**คำอธิบาย**:

- `Ordered` เป็น `interface` ที่กำหนดข้อจำกัดให้รองรับ `int`, `float64`, `string`
- ฟังก์ชัน `Max` ใช้ `T Ordered` เพื่อจำกัดเฉพาะประเภทที่เปรียบเทียบได้

## ข้อดีของการใช้ Generics เพื่อเพิ่มความยืดหยุ่น

1. **ลดการทำซ้ำโค้ด (Code Reusability)**: สามารถสร้างฟังก์ชันและโครงสร้างข้อมูลที่ทำงานได้กับหลายประเภท
2. **เพิ่มความปลอดภัย (Type Safety)**: ประเภทข้อมูลถูกตรวจสอบในขณะคอมไพล์
3. **ประสิทธิภาพที่ดีขึ้น**: ลดการใช้ `interface{}` ที่มี Overhead สูง
4. **รองรับหลายประเภท (Type Agnostic)**: สามารถประยุกต์ใช้กับโครงสร้างข้อมูลทั่วไป เช่น Stack, Queue, หรือ Map

### ตัวอย่าง: Generic Stack

```go
package main

import "fmt"

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

func main() {
    intStack := Stack[int]{}
    intStack.Push(10)
    intStack.Push(20)

    val, ok := intStack.Pop()
    if ok {
        fmt.Println(val) // 20
    }

    strStack := Stack[string]{}
    strStack.Push("Go")

    valStr, ok := strStack.Pop()
    if ok {
        fmt.Println(valStr) // Go
    }
}
```

Generics ใน Go ช่วยให้โค้ดมีความยืดหยุ่น ปลอดภัย และมีประสิทธิภาพยิ่งขึ้น การทำความเข้าใจและประยุกต์ใช้จะช่วยให้คุณพัฒนาโปรแกรมที่รองรับหลายประเภทได้ง่ายขึ้นในอนาคต!
