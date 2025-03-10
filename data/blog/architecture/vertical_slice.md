---
title: 'Vertical Slice Architecture'
date: '2025-03-10'
lastmod: '2025-03-10'
tags: ['architecture', 'rest', 'go']
draft: false
summary: 'เป็นแนวทางในการออกแบบแอปพลิเคชันที่เน้นการแยกส่วนตาม Feature หรือ Use Case'
---

**Vertical Slice Architecture** เป็นแนวทางในการออกแบบแอปพลิเคชันที่เน้นการแยกส่วนตาม **Feature** หรือ **Use Case** แทนที่จะจัดเรียงโค้ดตาม Layer (เช่น Controller, Service, Repository) แบบดั้งเดิม (Layered Architecture) โดยวิธีนี้ช่วยลดความซับซ้อน (Complexity) และเพิ่มความยืดหยุ่น (Flexibility) ในการขยายระบบ

ในบทความนี้ เราจะอธิบายแนวคิดของ Vertical Slice Architecture พร้อมตัวอย่างการใช้งานในภาษา **Go** โดยใช้ **Fiber** เป็น Web Framework และ **PostgreSQL** เป็นฐานข้อมูล

- ความแตกต่างระหว่าง Vertical Slice และ Layered Architecture
- หลักการสำคัญของ Vertical Slice Architecture
- โครงสร้างโปรเจกต์แบบ Vertical Slice
- ตัวอย่างโค้ด

---

## ความแตกต่างระหว่าง Vertical Slice และ Layered Architecture

| **Layered Architecture**                     | **Vertical Slice Architecture**      |
| -------------------------------------------- | ------------------------------------ |
| แบ่งตาม Layer (Handler, Service, Repository) | แบ่งตาม Feature หรือ Use Case        |
| Service หนึ่งรองรับหลาย Feature              | Slice แต่ละอันเป็นอิสระจากกัน        |
| ทำให้โค้ดมีการ Coupling สูง                  | ลด Coupling และเพิ่ม Cohesion        |
| แก้ไขหรือเพิ่ม Feature อาจกระทบหลาย Layer    | แต่ละ Feature ถูกแยกออกมาอย่างชัดเจน |

## หลักการสำคัญของ Vertical Slice Architecture

1. **แยกตาม Use Case**: แต่ละ Slice ครอบคลุมฟังก์ชันการทำงานหนึ่งอย่าง เช่น `CreateOrder`, `UpdateCustomer`
2. **อิสระต่อกัน**: แต่ละ Slice ทำงานได้โดยไม่ต้องพึ่งพา Slice อื่น ๆ
3. **Separation of Concern**: โค้ดของแต่ละ Slice ครอบคลุมทุกอย่าง ตั้งแต่ HTTP Handler → Business Logic → Database Query
4. **Extensible**: สามารถเพิ่มฟีเจอร์ใหม่โดยไม่กระทบฟีเจอร์เดิม

## โครงสร้างโปรเจกต์แบบ Vertical Slice ใน Go

```text
project-root/
├── cmd/
│   └── main.go
├── internal/
│   ├── order/
│   │    ├── create/
│   │    │     ├── handler.go
│   │    │     ├── service.go
│   │    │     └── repository.go
│   │    ├── update/
│   │    └── delete/
│   └── customer/
│         ├── create/
│         ├── get/
│         └── update/
└── pkg/
     └── db/
          └── postgres.go
```

## ตัวอย่างโค้ด: Vertical Slice สำหรับสร้าง Order

**</> main.go (Bootstrap Application) :**

```go
package main

import (
 "log"

 "github.com/gofiber/fiber/v2"
 "your_project/internal/order/create"
 "your_project/pkg/db"
)

func main() {
 app := fiber.New()

 // Connect Database
 dbConn := db.ConnectPostgres()

 // Register Routes
 create.RegisterRoute(app, dbConn)

 log.Fatal(app.Listen(":3000"))
}
```

**</> postgres.go (Database Connector) :**

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

**</> handler.go (HTTP Handler) :**

```go
package create

import (
 "database/sql"

 "github.com/gofiber/fiber/v2"
)

type CreateOrderRequest struct {
 CustomerID int `json:"customer_id"`
 ProductID  int `json:"product_id"`
 Amount     int `json:"amount"`
}

func RegisterRoute(app *fiber.App, db *sql.DB) {
 repo := NewOrderRepository(db)
 service := NewOrderService(repo)

 app.Post("/orders", func(c *fiber.Ctx) error {
  var req CreateOrderRequest
  if err := c.BodyParser(&req); err != nil {
   return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
  }

  orderID, err := service.CreateOrder(req.CustomerID, req.ProductID, req.Amount)
  if err != nil {
   return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
  }

  return c.Status(fiber.StatusCreated).JSON(fiber.Map{"order_id": orderID})
 })
}
```

**</> service.go (Business Logic) :**

```go
package create

type OrderService struct {
 repo OrderRepository
}

func NewOrderService(repo OrderRepository) *OrderService {
 return &OrderService{repo: repo}
}

func (s *OrderService) CreateOrder(customerID, productID, amount int) (int64, error) {
 if amount <= 0 {
  return 0, fmt.Errorf("Invalid amount")
 }
 return s.repo.Create(customerID, productID, amount)
}
```

**</> repository.go (Data Access Layer) :**

```go
package create

import (
 "database/sql"
)

type OrderRepository interface {
 Create(customerID, productID, amount int) (int64, error)
}

type orderRepository struct {
 db *sql.DB
}

func NewOrderRepository(db *sql.DB) OrderRepository {
 return &orderRepository{db: db}
}

func (r *orderRepository) Create(customerID, productID, amount int) (int64, error) {
 query := "INSERT INTO orders (customer_id, product_id, amount) VALUES ($1, $2, $3) RETURNING id"
 var orderID int64
 err := r.db.QueryRow(query, customerID, productID, amount).Scan(&orderID)
 return orderID, err
}
```

---

## สรุป

**Vertical Slice Architecture** เป็นวิธีการออกแบบระบบที่เหมาะสำหรับแอปพลิเคชันที่ต้องการความยืดหยุ่นในการเพิ่มฟีเจอร์และลดความซับซ้อนในโครงสร้างของโค้ด เหมาะสำหรับทั้งระบบขนาดเล็กและขนาดใหญ่ โดยเฉพาะอย่างยิ่งเมื่อใช้ร่วมกับแนวคิด **Domain-Driven Design (DDD)** หรือ **Event-Driven Architecture (EDA)**

ด้วยแนวทางนี้ คุณสามารถเพิ่มฟีเจอร์ใหม่ได้ง่ายขึ้นโดยไม่ต้องแก้ไขโค้ดในหลายๆ ส่วน ซึ่งทำให้การดูแลและขยายระบบทำได้อย่างมีประสิทธิภาพสูงสุด
