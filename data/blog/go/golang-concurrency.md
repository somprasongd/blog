---
title: 'การทำงานแบบ Concurrency ในภาษา Go'
date: '2025-02-07'
tags: ['go']
draft: false
summary: 'การทำงานแบบ Concurrency ในภาษา Go ด้วย Goroutine และ Channel'
---

# การทำงานแบบ Concurrency ในภาษา Go

ภาษา Go ได้รับการออกแบบมาเพื่อรองรับการประมวลผลแบบพร้อมกัน (Concurrency) อย่างมีประสิทธิภาพ ซึ่งเหมาะสำหรับงานที่ต้องทำหลาย ๆ อย่างพร้อมกัน เช่น การประมวลผลข้อมูลจำนวนมาก หรือการให้บริการ API ที่ต้องรองรับผู้ใช้จำนวนมาก

Go มีโครงสร้างหลักสำหรับ Concurrency สองอย่าง คือ:

- **Goroutine**: หน่วยประมวลผลที่ทำงานแบบขนาน
- **Channel**: กลไกสำหรับการสื่อสารระหว่าง Goroutines

ในบทความนี้ เราจะมาทำความเข้าใจแนวคิดเหล่านี้ พร้อมตัวอย่างการใช้งาน

## Goroutine คืออะไร?

Goroutine เป็น Lightweight Thread ซึ่งใช้ทรัพยากรตำ่ ใน Go สามารถสร้าง Goroutine ได้ง่าย ๆ โดยการเพิ่มคีย์เวิร์ด `go` หน้าคำสั่งที่ต้องการให้ทำงานแบบขนาน

### ตัวอย่าง: การสร้าง Goroutine

```go
package main

import (
    "fmt"
    "time"
)

func sayHello() {
    for i := 1; i <= 5; i++ {
        fmt.Println("Hello")
        time.Sleep(1 * time.Second)
    }
}

func main() {
    go sayHello() // เรียกใช้ Goroutine

    for i := 1; i <= 5; i++ {
        fmt.Println("World")
        time.Sleep(1 * time.Second)
    }
}
```

**ผลลัพธ์ที่ได้:**

- คำว่า "Hello" และ "World" จะปรากฏสลับกัน เพราะทั้งสองฟังก์ชันทำงานพร้อมกัน

### ทำไมต้องใช้ Goroutine?

- ประหยัดหน่วยความจำ (เบากว่า OS Thread)
- จัดการง่ายด้วย Go runtime
- เหมาะกับงานที่ต้องทำหลายอย่างพร้อมกัน เช่น I/O, Network Requests

## Channel คืออะไร?

Channel เป็นตัวกลางสำหรับส่งข้อมูลระหว่าง Goroutine โดยสามารถใช้เพื่อการสื่อสารอย่างปลอดภัยในโปรแกรมที่ทำงานแบบขนาน

### สร้าง Channel

```go
ch := make(chan int) // สร้างช่องสัญญาณที่รับ-ส่งข้อมูลประเภท int
```

### ส่งและรับข้อมูลผ่าน Channel

```go
package main

import "fmt"

func main() {
    ch := make(chan string)

    go func() {
        ch <- "Hello from Goroutine" // ส่งข้อมูลเข้า Channel
    }()

    msg := <-ch // รับข้อมูลจาก Channel
    fmt.Println(msg)
}
```

**ผลลัพธ์:**

```
Hello from Goroutine
```

## ตัวอย่างการใช้งาน Goroutine + Channel

### ตัวอย่าง: คำนวณผลรวมแบบขนาน

```go
package main

import "fmt"

func sum(numbers []int, result chan int) {
    sum := 0
    for _, n := range numbers {
        sum += n
    }
    result <- sum // ส่งผลรวมเข้า Channel
}

func main() {
    numbers := []int{1, 2, 3, 4, 5, 6}

    ch1 := make(chan int)
    ch2 := make(chan int)

    go sum(numbers[:len(numbers)/2], ch1) // ครึ่งแรก
    go sum(numbers[len(numbers)/2:], ch2) // ครึ่งหลัง

    total := <-ch1 + <-ch2 // รวมผลลัพธ์จากทั้งสอง Goroutine
    fmt.Println("Total Sum:", total)
}
```

**ผลลัพธ์:**

```
Total Sum: 21
```

## การปิด Channel (Closing Channels)

เมื่อส่งข้อมูลเสร็จแล้ว สามารถปิด Channel ได้ด้วย `close()`

### ตัวอย่าง: ปิด Channel

```go
package main

import "fmt"

func main() {
    ch := make(chan int, 3)

    ch <- 1
    ch <- 2
    close(ch) // ปิด Channel

    for num := range ch {
        fmt.Println(num)
    }
}
```

**ผลลัพธ์:**

```
1
2
```

## การใช้ `select` เพื่อจัดการหลาย Channel

`select` ใช้สำหรับรอข้อมูลจากหลาย ๆ Channel พร้อมกัน

### ตัวอย่าง: อ่านจากหลาย Channel

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(2 * time.Second)
        ch1 <- "Message from ch1"
    }()

    go func() {
        time.Sleep(1 * time.Second)
        ch2 <- "Message from ch2"
    }()

    select {
    case msg1 := <-ch1:
        fmt.Println(msg1)
    case msg2 := <-ch2:
        fmt.Println(msg2)
    }
}
```

**ผลลัพธ์:**

```
Message from ch2
```

## WaitGroup คืออะไร?

`sync.WaitGroup` ใช้เพื่อรอให้ Goroutine ทั้งหมดทำงานเสร็จก่อนที่โปรแกรมจะสิ้นสุด

### ตัวอย่าง: ใช้ WaitGroup

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // แจ้งว่า Goroutine นี้เสร็จแล้ว
    fmt.Printf("Worker %d started\n", id)
    time.Sleep(2 * time.Second)
    fmt.Printf("Worker %d finished\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait() // รอจนกว่าทุก Goroutine จะทำงานเสร็จ
    fmt.Println("All workers finished")
}
```

## Race Condition คืออะไร?

Race Condition เกิดขึ้นเมื่อหลาย Goroutine เข้าถึงและแก้ไขตัวแปรเดียวกันพร้อมกันโดยไม่มีการป้องกัน

### ตัวอย่าง: Race Condition

```
package main

import (
    "fmt"
    "time"
)

var counter int

func increment() {
    for i := 0; i < 1000; i++ {
        counter++
    }
}

func main() {
    go increment()
    go increment()

    time.Sleep(1 * time.Second)
    fmt.Println("Final Counter:", counter)
}
```

## ป้องกัน Race Condition ด้วย Mutex

`sync.Mutex` ใช้ล็อกตัวแปรเพื่อป้องกัน Race Condition

### ตัวอย่าง: ใช้ Mutex ป้องกัน Race Condition

```go
package main

import (
    "fmt"
    "sync"
)

var (
    counter int
    mu      sync.Mutex
)

func increment() {
    for i := 0; i < 1000; i++ {
        mu.Lock()
        counter++
        mu.Unlock()
    }
}

func main() {
    var wg sync.WaitGroup
    wg.Add(2)

    go func() { defer wg.Done(); increment() }()
    go func() { defer wg.Done(); increment() }()

    wg.Wait()
    fmt.Println("Final Counter:", counter)
}
```

## สรุป

- **Goroutine**: ใช้สำหรับทำงานแบบขนาน
- **Channel**: ใช้ในการสื่อสารระหว่าง Goroutine
- **WaitGroup**: ใช้รอให้ Goroutine ทั้งหมดทำงานเสร็จ
- **Race Condition**: ปัญหาการเข้าถึงทรัพยากรพร้อมกัน
- **Mutex**: ใช้ล็อกเพื่อป้องกัน Race Condition
