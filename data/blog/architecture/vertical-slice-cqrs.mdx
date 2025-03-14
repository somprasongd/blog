---
title: 'Vertical Slice Architecture ร่วมกับ CQRS และ Mediator Pattern'
date: '2025-03-12'
lastmod: '2025-03-12'
tags: ['architecture', 'rest', 'go']
draft: false
summary: 'นำแนวคิดของ Vertical Slice Architecture ร่วมกับ CQRS (Command Query Responsibility Segregation) เพื่อช่วยให้แต่ละ Feature ถูกแยกออกอย่างชัดเจน'
---

# Vertical Slice Architecture ร่วมกับ CQRS และ Mediator Pattern

จากบทความที่แล้ว เราได้ทำความรู้จักับ **[Vertical Slice Architecture](https://somprasongd.work/blog/architecture/vertical-slice)** กันไปแล้ว ว่าเป็นแนวทางในการออกแบบแอปพลิเคชันที่เน้นการแยกส่วนตาม **Feature** หรือ **Use Case**

ในบทความนี้ จะนำแนวคิดของ **Vertical Slice Architecture** ร่วมกับ **CQRS (Command Query Responsibility Segregation)** เพื่อช่วยให้แต่ละ Feature ถูกแยกออกอย่างชัดเจนระหว่างคำสั่ง (Command) และคำขอข้อมูล (Query) รวมถึงการจัดการคำขอผ่าน **Mediator Pattern** เพื่อให้การประสานงานระหว่างชั้นต่าง ๆ ง่ายขึ้น

- ความแตกต่างระหว่าง Vertical Slice, CQRS และ Layered Architecture
- หลักการสำคัญของ Vertical Slice + CQRS + Mediator Pattern
- โครงสร้างโปรเจกต์แบบ Vertical Slice + CQRS + Mediator
- ตัวอย่างโค้ด

---

## ความแตกต่างระหว่าง Vertical Slice, CQRS และ Layered Architecture

| **Layered Architecture**                     | **Vertical Slice Architecture + CQRS + Mediator**                  |
| -------------------------------------------- | ------------------------------------------------------------------ |
| แบ่งตาม Layer (Handler, Service, Repository) | แบ่งตาม Feature หรือ Use Case และแยกการประมวลผลคำสั่งและคำขอข้อมูล |
| Service หนึ่งรองรับหลาย Feature              | Slice แต่ละอันเป็นอิสระและแยก Command กับ Query                    |
| Coupling สูง                                 | ลด Coupling ด้วย Mediator ที่เป็นตัวกลางในการประสานงาน             |
| แก้ไขหรือเพิ่ม Feature อาจกระทบหลาย Layer    | สามารถเพิ่ม Feature ใหม่ได้โดยไม่กระทบ Slice อื่น ๆ                |

## หลักการสำคัญของ Vertical Slice + CQRS + Mediator Pattern

1. **แยกคำสั่ง (Command) และคำขอ (Query)**: ลดความซับซ้อนของโค้ดและปรับปรุงประสิทธิภาพ
2. **Mediator เป็นตัวกลาง**: ใช้ Mediator ในการจัดการการสื่อสารระหว่าง Handler, Service และ Repository
3. **อิสระต่อกัน**: Slice แต่ละอันสามารถทำงานได้โดยไม่ขึ้นกับ Slice อื่น
4. **Extensible**: เพิ่มฟีเจอร์ใหม่ได้ง่ายโดยไม่ต้องแก้ไขโค้ดส่วนกลาง

## โครงสร้างโปรเจกต์แบบ Vertical Slice + CQRS + Mediator ใน Go

```text
project-root/
├── cmd/
│   └── main.go
├── internal/
│   ├── order/
│   │    ├── create/
│   │    │     ├── command.go
│   │    │     ├── handler.go
│   │    │     ├── service.go  // command handler
│   │    │     ├── repository.go
│   │    │     └── register.go
│   │    ├── get/
│   │    │     ├── query.go
│   │    │     ├── handler.go
│   │    │     ├── service.go  // query handler
│   │    │     ├── repository.go
│   │    │     └── register.go
│   └── mediator/
│         └── mediator.go
└── pkg/
     └── db/
          └── postgres.go
```

## ตัวอย่างโค้ด: Vertical Slice + CQRS + Mediator สำหรับสร้าง Order

**#️⃣ main.go (Bootstrap Application) :**

```go
package main

import (
 "go-vcm/internal/mediator"
 "go-vcm/internal/order/create"
 "go-vcm/pkg/db"
 "log"

 "github.com/gofiber/fiber/v2"
)

func main() {
 app := fiber.New()

 // Connect Database
 dbConn := db.ConnectPostgres()

 // Register Mediator
 m := mediator.NewMediator()

 // Register Command Handlers
 create.RegisterCreateOrderHandler(m, dbConn)

 // Register Routes
 app.Post("/orders", func(c *fiber.Ctx) error {
  return create.HandleCreateOrder(c, m)
 })

 log.Fatal(app.Listen(":3000"))
}
```

**#️⃣ postgres.go (Database Connector) :**

```go
package db

import (
 "database/sql"
 "log"

 _ "github.com/lib/pq"
)

func ConnectPostgres() *sql.DB {
 connStr := "postgres://user:password@localhost:5432/appdb?sslmode=disable"
 db, err := sql.Open("postgres", connStr)
 if err != nil {
  log.Fatal("Failed to connect to database:", err)
 }
 if err := db.Ping(); err != nil {
  log.Fatal("Database not reachable:", err)
 }
 return db
}
```

**#️⃣ mediator.go (Mediator Implementation) :**

```go
package mediator

import (
 "context"
 "fmt"
)

type Request interface{}

type HandlerFunc func(context.Context, Request) (interface{}, error)

type Mediator struct {
 handlers map[string]HandlerFunc
}

func NewMediator() *Mediator {
 return &Mediator{handlers: make(map[string]HandlerFunc)}
}

func (m *Mediator) Register(command string, handler HandlerFunc) {
 m.handlers[command] = handler
}

func (m *Mediator) Send(command string, ctx context.Context, request Request) (interface{}, error) {
 handler, exists := m.handlers[command]
 if !exists {
  return nil, fmt.Errorf("handler not found for command: %s", command)
 }
 return handler(ctx, request)
}
```

**#️⃣ command.go (Command Definition) :**

```go
package create

type CreateOrderCommand struct {
 CustomerID int `json:"customer_id"`
 ProductID  int `json:"product_id"`
 Amount     int `json:"amount"`
}
```

**#️⃣ service.go (Command Handler - Business Logic) :**

```go
package create

import (
 "context"
 "fmt"
)

type OrderService struct {
 repo OrderRepository
}

func NewOrderService(repo OrderRepository) *OrderService {
 return &OrderService{repo: repo}
}

func (s *OrderService) CreateOrder(ctx context.Context, cmd CreateOrderCommand) (int64, error) {
 if cmd.Amount <= 0 {
  return 0, fmt.Errorf("invalid amount")
 }
 return s.repo.Create(ctx, cmd.CustomerID, cmd.ProductID, cmd.Amount)
}

```

**#️⃣ register.go (Register Command Handler) :**

```go
package create

import (
 "context"
 "database/sql"
 "go-vcm/internal/mediator"
)

func RegisterCreateOrderHandler(m *mediator.Mediator, dbConn *sql.DB) {
 repo := NewOrderRepository(dbConn)
 service := NewOrderService(repo)

 m.Register("CreateOrder", func(ctx context.Context, request mediator.Request) (interface{}, error) {
  cmd := request.(CreateOrderCommand)
  return service.CreateOrder(ctx, cmd)
 })
}

```

**#️⃣ repository.go (Data Access Layer) :**

```go
package create

import (
 "context"
 "database/sql"
)

type OrderRepository interface {
 Create(ctx context.Context, customerID, productID, amount int) (int64, error)
}

type orderRepository struct {
 db *sql.DB
}

func NewOrderRepository(db *sql.DB) OrderRepository {
 return &orderRepository{db: db}
}

func (r *orderRepository) Create(ctx context.Context, customerID, productID, amount int) (int64, error) {
 query := "INSERT INTO orders (customer_id, product_id, amount) VALUES ($1, $2, $3) RETURNING id"
 var orderID int64
 err := r.db.QueryRow(query, customerID, productID, amount).Scan(&orderID)
 return orderID, err
}
```

**#️⃣ handler.go (HTTP Handler) :**

```go
package create

import (
 "go-vcm/internal/mediator"

 "github.com/gofiber/fiber/v2"
)

func HandleCreateOrder(c *fiber.Ctx, m *mediator.Mediator) error {
 var cmd CreateOrderCommand
 if err := c.BodyParser(&cmd); err != nil {
  return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
 }
 // เรียกใช้ service ผ่าน mediator
 result, err := m.Send("CreateOrder", c.Context(), cmd)
 if err != nil {
  return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
 }

 return c.Status(fiber.StatusCreated).JSON(result)
}
```

## สรุป

การรวม **Vertical Slice Architecture** กับ **CQRS** และ **Mediator Pattern** ช่วยเพิ่มความยืดหยุ่นในการจัดการคำสั่ง (Command) และคำขอข้อมูล (Query) แยกจากกันอย่างชัดเจน ทำให้การเพิ่มฟีเจอร์ใหม่ทำได้ง่ายโดยไม่กระทบส่วนอื่น ๆ ของระบบ อีกทั้งยังช่วยให้การจัดการโค้ดในระบบขนาดใหญ่มีประสิทธิภาพและง่ายต่อการดูแลรักษาในระยะยาว
