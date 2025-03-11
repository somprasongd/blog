---
title: 'แปลง REST API จาก Layered Architecture ไปเป็น Hexagonal Architecture'
date: '2025-03-10'
lastmod: '2025-03-10'
tags: ['architecture', 'rest', 'go']
draft: false
summary: 'แปลง REST API จาก Layered Architecture ไปเป็น Hexagonal Architecture'
---

# แปลง REST API จาก Layered Architecture ไปเป็น Hexagonal Architecture

## ทำไมต้องเปลี่ยน?

### ปัญหาของ Layered Architecture

1. **การพึ่งพาระหว่างเลเยอร์แบบแน่น (Tight Coupling)**
   - แต่ละเลเยอร์ (Controller, Service, Repository) ผูกติดกันโดยตรง ทำให้การเปลี่ยนแปลงโค้ดยาก
2. **ทดสอบยาก (Difficult to Test)**
   - Unit Test ยากเพราะต้อง Mock หลายชั้น
3. **ขยายระบบลำบาก (Hard to Scale)**
   - การเพิ่มฟีเจอร์ใหม่ต้องผ่านเลเยอร์เดิมทั้งหมด

### ข้อดีของ Hexagonal Architecture

1. **แยก Business Logic ออกจาก User Interface กับ Infrastructure**
   - ไม่ผูกกับ Framework หรือ Database
2. **เพิ่มความยืดหยุ่น (Flexibility)**
   - เปลี่ยนแปลง Framework หรือ Database ได้ง่าย
3. **ทดสอบง่าย (Testability)**
   - Mock Interfaces ได้สะดวก

## ตัวอย่างการแปลงโค้ด

### ▶ โค้ดใน Layered Architecture

**🗂️ โครงสร้าง Layered Architecture :**

```text
├── application
│   └── app.go
├── handler
│   ├── customer.go
│   └── order.go
├── service
│   ├── customer.go
│   └── order.go
├── repository
│   ├── customer.go
│   └── order.go
├── model
│   ├── customer.go
│   └── order.go
└── main.go
```

**#️⃣ handler.go :**

```go
package handler

import (
  "github.com/gofiber/fiber/v2"
  "myapp/service"
)

type CustomerHandler struct {
 service *service.CustomerService
}

func NewCustomerHandler(s *service.CustomerService) *CustomerHandler {
 return &CustomerHandler{service: s}
}

func (h *CustomerHandler) GetCustomer(c *fiber.Ctx) error {
 id := c.Params("id")
 customer, err := h.service.GetCustomer(id)
 if err != nil {
  return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
 }
 return c.JSON(customer)
}
```

**#️⃣ service.go :**

```go
package service

import (
  "myapp/model"
  "myapp/repository"
)

type CustomerService struct {
 repo *repository.CustomerRepository
}

func NewCustomerService(r *repository.CustomerRepository) *CustomerService {
 return &CustomerService{repo: r}
}

func (s *CustomerService) GetCustomer(id string) (*model.Customer, error) {
 return s.repo.FindById(id)
}
```

**#️⃣ repository.go :**

```go
package repository

import (
 "database/sql"
 "myapp/model"
)

type CustomerRepository struct {
 db *sql.DB
}

func NewCustomerRepository(db *sql.DB) *CustomerRepository {
 return &CustomerRepository{db: db}
}

func (r *CustomerRepository) FindById(id string) (*model.Customer, error) {
 var customer model.Customer
 err := r.db.QueryRow("SELECT id, name FROM customers WHERE id = $1", id).Scan(&customer.ID, &customer.Name)
 if err != nil {
  return nil, err
 }
 return &customer, nil
}
```

### ▶ โค้ดใน Hexagonal Architecture

**🗂️ โครงสร้าง Hexagonal Architecture :**

```text
├── application
│   └── app.go
├── contract
│   └── customer_api
│       ├── dto.go
│       └── service.go
├── module
│   ├── customer
│   │   ├── handler.go
│   │   ├── service.go
│   │   ├── repository.go
│   │   └── model.go
│   └── order
└── main.go
```

**#️⃣ contract/customer_api/service.go :**

```go
package customer_api

type CustomerService interface {
 GetCustomer(id string) (*CustomerDTO, error)
}

type CustomerDTO struct {
 ID   string `json:"id"`
 Name string `json:"name"`
}
```

**#️⃣ module/customer/model.go :**

```go
package customer

type Customer struct {
 ID   string
 Name string
}
```

**#️⃣ module/customer/repository.go :**

```go
package customer

import (
 "database/sql"
)

type CustomerRepository interface {
 FindById(id string) (*Customer, error)
}

type customerRepository struct {
 db *sql.DB
}

func NewCustomerRepository(db *sql.DB) CustomerRepository {
 return &customerRepository{db: db}
}

func (r *customerRepository) FindById(id string) (*Customer, error) {
 var c Customer
 err := r.db.QueryRow("SELECT id, name FROM customers WHERE id = $1", id).Scan(&c.ID, &c.Name)
 if err != nil {
  return nil, err
 }
 return &c, nil
}
```

**#️⃣ module/customer/service.go :**

```go
package customer

import "myapp/contract/customer_api"

type customerService struct {
 repo CustomerRepository
}

func NewCustomerService(repo CustomerRepository) customer_api.CustomerService {
 return &customerService{repo: repo}
}

func (s *customerService) GetCustomer(id string) (*customer_api.CustomerDTO, error) {
 c, err := s.repo.FindById(id)
 if err != nil {
  return nil, err
 }
 return &customer_api.CustomerDTO{ID: c.ID, Name: c.Name}, nil
}
```

**#️⃣ module/customer/handler.go :**

```go
package customer

import (
 "github.com/gofiber/fiber/v2"
 "myapp/contract/customer_api"
)

type CustomerHandler struct {
 service customer_api.CustomerService
}

func NewCustomerHandler(s customer_api.CustomerService) *CustomerHandler {
 return &CustomerHandler{service: s}
}

func (h *CustomerHandler) GetCustomer(c *fiber.Ctx) error {
 id := c.Params("id")
 customer, err := h.service.GetCustomer(id)
 if err != nil {
  return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
 }
 return c.JSON(customer)
}
```

---

## สรุป

Hexagonal Architecture ช่วยให้โค้ดสะอาด (Clean Code) มีการแยกหน้าที่ชัดเจน (Separation of Concerns) และสามารถขยายระบบ (Scalability) ได้ง่ายกว่า Layered Architecture โดยเฉพาะเมื่อแอปพลิเคชันซับซ้อนมากขึ้น.
