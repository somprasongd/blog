---
title: 'การจัดการ Error ใน Rest API'
date: '2025-02-06'
tags: ['go', 'api', 'error']
draft: false
summary: 'การจัดการ Error ใน Rest API แบบ 3-layer architecture'
---

# การจัดการ Error ใน Rest API แบบ 3-layer architecture

ในการพัฒนา Rest API ส่วนใหญ่เราจะวางโครงสร้างโปรเจคแบบ 3-layer architecture เช่น Handler → Service → Repository ดังนั้นก่อนจะไปดูว่าจะส่ง error กลับไปยังไง เราควรเริ่มจากการแบ่งหน้าที่ความรับผิดชอบของแต่ละ layer ก่อน ดังนี้

1. **Repository Layer:**
   - ให้ทำการ wrap database error นั้นๆ ด้วยข้อความที่สื่อความหมาย
   - หากรู้สาเหตุที่ชัดเจน ให้ return custom error กลับไป เช่น ErrDataIntegrity ในกรณี Foreign key, constraint violations หรือ ErrDuplicateEntry ในกรณี Conflict
2. **Service Layer:**
   - จัดการ validate input และแปลง repository errors ไปเป็น business errors
   - ให้ log unexpected errors ไว้สำหรับการ debug
3. **Handler Layer:**
   - แปลง service errors ไปเป็น HTTP response เช่น HTTP 400, 404, 500

ถัดมาลองสร้างรายการ error ที่เป็นไปได้ทั้งหมด ตามสถานะการทั่วไปมีอะไรบ้าง เช่น

| **Error Type**       | **HTTP Status**             | **When It Happens?**                                                             |
| -------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| ErrInvalidRequest    | `400 Bad Request`           | Invalid/malformed request (e.g., missing required fields, invalid format)        |
| ErrValidation        | `422 Unprocessable`         | When request data is structurally valid but violates business rules              |
| ErrAuthentication    | `401 Unauthorized`          | Missing or invalid authentication token                                          |
| ErrAuthorization     | `403 Forbidden`             | User does not have permission to access a resource                               |
| ErrResourceNotFound  | `404 Not Found`             | Resource not found (e.g., user, order, product doesn't exist)                    |
| ErrDuplicateEntry    | `409 Conflict`              | Conflict with existing resource (e.g., duplicate email, order already processed) |
| ErrBusinessLogic     | `422 Unprocessable`         | Failed logical validation (e.g., insufficient funds)                             |
| ErrTooManyRequests   | `429 Too Many Requests`     | Rate-limiting (too many API requests in a short time)                            |
| ErrDatabaseFailure   | `500 Internal Server Error` | Database connection failure, SQL error, or transaction failure                   |
| ErrDataIntegrity     | `500 Internal Server Error` | Database-related issues: Foreign key, constraint violations                      |
| ErrServiceDependency | `503 Service Unavailable`   | External service failure                                                         |
| ErrOperationFailed   | `500 Internal Server Error` | Unknown errors                                                                   |

เมื่อได้รายการทั้งหมดออกมาแล้ว มาเริ่มเขียนโค้ดกันเลย โดยจะใช้ภาษา Go ในการแสดงตัวอย่าง

### Step 1: สร้าง Custom errors

สร้าง custom error struct ขึ้นมา โดยมี error type และ message

```go
// file: util/errs/errs.go
package errs

// ErrorType defines a type for different error categories in the service layer
type ErrorType string

const (
 // Input and Request Issues
 ErrInvalidRequest ErrorType = "invalid_request"  // Malformed JSON, missing/invalid fields
 ErrValidation     ErrorType = "validation_error" // Field-level validation (business rules)

 // Authentication and Authorization
 ErrAuthentication ErrorType = "authentication_error" // Invalid credentials
 ErrAuthorization  ErrorType = "authorization_error"  // Permission denied

 // Resource State Issues
 ErrResourceNotFound ErrorType = "resource_not_found"   // Missing entity
 ErrDuplicateEntry   ErrorType = "duplicate_entry"      // Conflict (e.g., unique constraint)
 ErrBusinessLogic    ErrorType = "business_logic_error" // Violations of business rules

 // Infrastructure and General Failures
 ErrDataIntegrity     ErrorType = "data_integrity_error" // Foreign key, constraint violations
 ErrDatabaseFailure   ErrorType = "database_failure"     // DB-level errors
 ErrServiceDependency ErrorType = "service_dependency"   // External service unavailability
 ErrOperationFailed   ErrorType = "operation_failed"     // Generic internal failures
)

// AppError represents a structured error used in the service layer
type AppError struct {
 Type       ErrorType      `json:"type"`        // Error category
 Message    string         `json:"message"`     // Friendly message for clients
}

// Error implements the error interface
func (e *AppError) Error() string {
 return fmt.Sprintf("[%s] %s", e.Type, e.Message)
}

// NewAppError creates a new AppError
func NewAppError(typ ErrorType, message string) *AppError {
 return &AppError{
  Type:       typ,
  Message:    message,
 }
}

// GetErrorType extracts the error type from an error
func GetErrorType(err error) ErrorType {
 if appErr, ok := err.(*AppError); ok {
  return appErr.Type
 }
 return ErrOperationFailed // Default error type if not recognized
}
```

### Step 2: Repository Layer

- Wrap database errors
- Return `ErrDuplicateEntry` ในกรณีที่ email ซ้ำ

```go
// file: repository/customer.go
package repository

import (
 "context"
 "database/sql"
 "fmt"
 "time"

 "github.com/lib/pq"

 "my-app/models"
)

type UserRepository struct {
 db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
 return &UserRepository{db *sql.DB}
}

func (r *UserRepository) Create(ctx context.Context, user *models.User) error {
 query := `INSERT INTO public.users (email, name) VALUES ($1, $2) RETURING id`

 err := r.db.QueryRowContext(ctx, query, user.Email, user.Name).
 Scan(&user.ID)
 if err != nil {
  // Detect duplicate entry (Postgres unique_violation code: 23505)
  if pqErr, ok := err.(*pq.Error); ok {
   if pqErr.Code == "23505" {
    return NewAppError(ErrDuplicateEntry, "email already registered")
   }
  }
  // Wrap database error
  return fmt.Errorf("failed to create user: %w", err)
 }

 return nil
}

```

### Step 3: Service Layer

- จัดการ validate input
- แปลง repository errors ไปเป็น business errors
- ให้ log unexpected errors ไว้สำหรับการ debug

```go
// service/user.go
package service

import (
 "context"
 "log"
 "my-app/dtos"
 "my-app/models"
 "my-app/repository"
 "my-app/util/errs"
)

type UserService struct {
 userRepo *repository.UserRepository
}

func NewOrderService(userRepo repository.UserRepository) *UserService {
 return &UserService{userRepo: userRepo}
}

func (s *UserService) CreateUser(ctx context.Context, req *dtos.User) (int, error) {
  // validation input
 if req.Email == "" {
  return errs.NewAppError(errors.ErrValidation, "email is required")
 }

 user := &models.User{
  Email: req.Email,
  Name:  req.Name,
 }

 err := s.userRepo.Create(ctx, user)
 if err != nil {
  // log unexpected error
  log.Println(err)
  // handle repository error
  if ErrDuplicateEntry == errs.GetErrorType(err) {
   return err
  }
  return errs.NewAppErr(ErrDatabaseFailure, "failed to create user")
 }

 return user.ID, nil
}

```

### Step 4: Handler Layer

- แปลง service errors ไปเป็น HTTP response

```go
// file: handler/user.go
package handler

import (
 "github.com/gin-gonic/gin"
 "my-app/service"
 "my-app/dtos"
 "my-app/util/errs"
 "net/http"
)

type UserHandler struct {
 service *service.UserService
}

func NewUserHandler(srv service.UserService) *UserHandler{
 return &UserHandler{service: srv}
}

func (h *UserHandler) CreateUser(c *gin.Context) {
 var user dtos.User
 if err := c.ShouldBindJSON(&user); err != nil {
  // Invalid JSON format error
  h.handleError(c, errs.NewAppError(errors.ErrJSONParse, "invalid JSON format"))
  return
 }

 id, err := h.service.CreateUser(c.Request.Context(), &user)

 if err != nil {
  // Handle business validation error
  handleError(c, err)
  return
 }

 c.JSON(http.StatusCreated, gin.H{"id": id})
}

```

- สร้างฟังก์ชัน handleError ไว้ช่วยจัดการ error response

```go
// file: handler/handler.go
package handler

import (
 "github.com/gin-gonic/gin"
 "my-app/util/errs"
)

type errorResponse struct {
 ErrorType    errs.ErrorType `json:"error_type"`
 ErrorMessage string         `json:"error_message"`
}

// Centralized error handling
func (h *CustomerHandler) handleError(c *gin.Context, err error) {
 // Convert non-AppError to AppError with type ErrOperationFailed
 appErr, ok := err.(*errs.AppError);
 if !ok {
  appErr = errors.NewAppError(errs.ErrOperationFailed, err.Error())
 }

 // Get the appropriate HTTP status code based on the error type
 statusCode := errs.GetHTTPStatus(err)

 // Return the error in structured JSON format
 c.JSON(statusCode, errorResponse{
  ErrorType:    appErr.Type,
  ErrorMessage: appErr.Message,
 })
}

```

ซึ่งจะเห็นได้ว่าวิธีการนี้ เป็นการจัดการ Error ที่สอดคล้องกันในทุก Layer

- **Repository Layer**: ระบุข้อผิดพลาดฐานข้อมูล
- **Service Layer**: จัดการข้อผิดพลาด Validation และ Bussiness Login
- **Handler Layer**: แปลง Error เป็น JSON Response ที่เหมาะสม

**ประโยชน์:**

- ลดการทำงานซ้ำซ้อน (DRY Principle)
- มีการจัดการข้อผิดพลาดที่ชัดเจนและแยกความรับผิดชอบของแต่ละ Layer อย่างเหมาะสม

### 🎯 สรุปภาพรวม

- ✅ **แยกประเภท Error อย่างชัดเจน** ตามบริบท (Validation, Business, Database, External)
- ✅ **รองรับ HTTP Status Code ที่ถูกต้อง** ตามมาตรฐาน REST API
- ✅ **ดักจับข้อผิดพลาดฐานข้อมูลละเอียด** ด้วย PostgreSQL Error Code
- ✅ **ลดความซ้ำซ้อน** โดยใช้ `AppError` กลางสำหรับทุก Layer
- ✅ **ขยายง่าย** รองรับข้อผิดพลาดใหม่ ๆ ได้โดยเพิ่มเพียง `ErrorType`
- ✅ **เพิ่มความยืดหยุ่น** ในการแปลงและการแสดงผล Error อย่างมีโครงสร้าง
