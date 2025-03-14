---
title: 'เปรียบเทียบ Layered Architecture กับ Hexagonal Architecture ในการพัฒนา REST API'
date: '2025-03-09'
lastmod: '2025-03-09'
tags: ['architecture', 'rest', 'go']
draft: false
summary: 'เปรียบเทียบ Layered Architecture กับ Hexagonal Architecture ในการพัฒนา REST API'
---

# เปรียบเทียบ Layered Architecture กับ Hexagonal Architecture ในการพัฒนา REST API

ในการพัฒนา **REST API** หนึ่งในโครงสร้างยอดนิยมที่นักพัฒนามักใช้คือ **Layered Architecture** และ **Hexagonal Architecture** ทั้งสองแนวทางนี้มีการจัดการโครงสร้างแบบแยกส่วน (**Handler -> Service -> Repository**) แต่มีความแตกต่างกันในแง่ของหลักการออกแบบ การจัดการการพึ่งพากัน และความยืดหยุ่นของระบบ บทความนี้จะอธิบายแนวคิดของทั้งสองสถาปัตยกรรม เปรียบเทียบข้อดี-ข้อเสีย และแนะนำการใช้งานในสถานการณ์ที่เหมาะสม

- Layered Architecture คืออะไร?
- Hexagonal Architecture คืออะไร?
- เปรียบเทียบ Layered vs Hexagonal Architecture
- ข้อดี-ข้อเสีย Layered vs Hexagonal Architecture
- ควรเลือกใช้อะไรดี?

---

## Layered Architecture คืออะไร?

**Layered Architecture** (หรือที่เรียกว่า **N-tier Architecture**) เป็นรูปแบบการออกแบบที่แบ่งระบบออกเป็นเลเยอร์ตามหน้าที่ โดยแต่ละเลเยอร์มีความรับผิดชอบ (Separation of Concerns) ที่ชัดเจนและเชื่อมโยงกันตามลำดับ

### โครงสร้างของ Layered Architecture

```text
Request -> Handler -> Service -> Repository -> Database
```

- **Handler (หรือ Controller):** รับคำขอจากผู้ใช้ (HTTP Request) และประมวลผลข้อมูลเบื้องต้น
- **Service:** ประมวลผลตรรกะทางธุรกิจ (Business Logic)
- **Repository:** จัดการการเข้าถึงฐานข้อมูล (Data Access Layer)

### ตัวอย่างโค้ดใน Layered Architecture

```go
// Handler
func (h *UserHandler) CreateUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.BindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }
    err := h.userService.CreateUser(req)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "User created"})
}

// Service
func (s *UserService) CreateUser(req CreateUserRequest) error {
    user := User{Name: req.Name, Email: req.Email}
    return s.userRepo.Save(user)
}

// Repository
func (r *UserRepository) Save(user User) error {
    _, err := r.db.Exec("INSERT INTO users (name, email) VALUES (?, ?)", user.Name, user.Email)
    return err
}
```

---

## Hexagonal Architecture คืออะไร?

**Hexagonal Architecture** (หรือ **Ports and Adapters**) ถูกออกแบบมาเพื่อแยก **Core Business Logic** ออกจาก **User Interface** กับ **Infrastructure** เช่น REST API, Database ตามลำดับ ผ่านการใช้ **Ports (Interface)** และ **Adapters (Implementations)** ซึ่งทำให้ระบบมีความยืดหยุ่นและขยายได้ง่าย

### โครงสร้างของ Hexagonal Architecture

```text
+--------------------+
|  Adapter (REST)     |
+--------------------+
        ↓
+--------------------+
|  Input Port (API)  |
+--------------------+
        ↓
+--------------------+
|  Application Logic |
+--------------------+
        ↓
+--------------------+
|  Output Port (DB)  |
+--------------------+
        ↓
+--------------------+
|  Adapter (Postgres) |
+--------------------+
```

### ตัวอย่างโค้ดใน Hexagonal Architecture

```go
// Port (Interface)
type UserRepository interface {
    Save(user User) error
}

// Application (Core Business Logic)
type UserService struct {
    repo UserRepository
}

func (s *UserService) CreateUser(req CreateUserRequest) error {
    user := User{Name: req.Name, Email: req.Email}
    return s.repo.Save(user)
}

// Adapter (REST API)
func (h *UserHandler) CreateUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.BindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }
    if err := h.userService.CreateUser(req); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "User created"})
}

// Adapter (Postgres)
type PostgresUserRepository struct {
    db *sql.DB
}

func (r *PostgresUserRepository) Save(user User) error {
    _, err := r.db.Exec("INSERT INTO users (name, email) VALUES (?, ?)", user.Name, user.Email)
    return err
}
```

---

## เปรียบเทียบ Layered vs Hexagonal Architecture

| **คุณสมบัติ**              | **Layered Architecture**                     | **Hexagonal Architecture**                              |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| **การเชื่อมต่อ (Flow)**    | แบบลำดับชั้น (Top-down)                      | มีความยืดหยุ่นสูง (Input/Output ผ่าน Port)              |
| **Separation of Concerns** | แยกตามเลเยอร์ (Handler, Service, Repository) | แยก Core Logic ออกจาก User Interface กับ Infrastructure |
| **การทดสอบ (Testing)**     | ยากในการทดสอบเฉพาะส่วน เพราะผูกติดกัน        | ง่ายต่อการทดสอบ Unit Test ผ่าน Interface                |
| **Dependency Direction**   | จากบนลงล่าง (Service พึ่งพา Repository)      | Domain ไม่พึ่งพา Infrastructure (Inversion)             |
| **เปลี่ยน Infrastructure** | ยาก เพราะผูกติดกับ Data Layer                | ง่าย เพราะเปลี่ยน Adapter โดยไม่กระทบ Core              |
| **ความซับซ้อน**            | เข้าใจง่ายกว่า เหมาะกับโครงการเล็ก-กลาง      | ซับซ้อนขึ้น แต่ยืดหยุ่นสูง เหมาะกับโครงการใหญ่          |

---

## ข้อดี-ข้อเสีย Layered vs Hexagonal Architecture

### Layered Architecture

✅ **ข้อดี:**

- โครงสร้างง่าย เข้าใจง่าย เหมาะสำหรับโครงการขนาดเล็ก
- พัฒนาได้เร็ว เพราะไม่ต้องจัดการ Interface มากนัก

**⛔️ ข้อเสีย:**

- Coupling สูงระหว่าง Layer ทำให้เปลี่ยนแปลงยาก
- การทดสอบแบบ Unit Test ทำได้ยากเพราะการพึ่งพาโดยตรง

### **Hexagonal Architecture**

✅ **ข้อดี:**

- Decoupling สูง (แยก Core จาก Infrastructure)
- รองรับ Input/Output หลายรูปแบบ (REST, gRPC, Kafka)
- ง่ายต่อการทดสอบและขยายในอนาคต

**⛔️ ข้อเสีย:**

- ซับซ้อนขึ้น ใช้ Interface มากขึ้น
- ต้องออกแบบให้ดีตั้งแต่เริ่มต้น

---

## ควรเลือกใช้อะไรดี?

| สถานการณ์                                    | สถาปัตยกรรมที่แนะนำ           |
| -------------------------------------------- | ----------------------------- |
| โครงการขนาดเล็ก - ขนาดกลาง                   | ✅ **Layered Architecture**   |
| ระบบที่เปลี่ยน Infrastructure บ่อยๆ          | ✅ **Hexagonal Architecture** |
| ต้องการรองรับหลาย Protocol (เช่น REST, gRPC) | ✅ **Hexagonal Architecture** |
| ระบบที่เน้นการขยาย (Scalability)             | ✅ **Hexagonal Architecture** |

---

## สรุป

- **Layered Architecture** เหมาะสำหรับโครงการที่ต้องการความเรียบง่าย พัฒนาเร็ว แต่มีข้อจำกัดในการเปลี่ยน Infrastructure
- **Hexagonal Architecture** เหมาะสำหรับโครงการขนาดใหญ่ที่ต้องการความยืดหยุ่น แยกส่วนระหว่าง Business Logic กับ External Systems

เลือกโครงสร้างให้เหมาะสมกับความซับซ้อนและความต้องการของโครงการจะช่วยให้ระบบมีประสิทธิภาพและขยายตัวได้ง่ายในอนาคต!
