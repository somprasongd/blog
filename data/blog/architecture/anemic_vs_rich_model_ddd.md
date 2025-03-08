---
title: 'ความสัมพันธ์ระหว่าง Anemic Model และ Rich Model กับ Domain-Driven Design (DDD)'
date: '2025-03-08'
lastmod: '2025-03-08'
tags: ['model', 'go', 'architecture', 'ddd']
draft: false
summary: 'ความสัมพันธ์ระหว่าง Anemic Model และ Rich Model กับ Domain-Driven Design (DDD)'
---

# ความสัมพันธ์ระหว่าง Anemic Model และ Rich Model กับ Domain-Driven Design (DDD)

**Domain-Driven Design (DDD)** เป็นแนวทางการออกแบบซอฟต์แวร์ที่เน้นการสร้างระบบโดยยึดตาม **Domain** (ขอบเขตของธุรกิจ) ซึ่งมีแนวคิดสำคัญ เช่น **Entity**, **Value Object**, **Aggregate**, **Domain Event** และ **Bounded Context**

เมื่อพิจารณา **Anemic Model** และ **Rich Model** ในบริบทของ DDD ทั้งสองแนวทางมีความสัมพันธ์ที่แตกต่างกัน:

---

### ✅ **1. การใช้ Anemic Model ใน DDD**

**Anemic Model** ขัดแย้งกับหลักการของ DDD เนื่องจาก:

1. **ละเมิดหลักการ Encapsulation**:
   - DDD เน้นให้ตรรกะของ Domain อยู่ภายใน Entity หรือ Aggregate เพื่อรักษาความสอดคล้อง (Consistency) ของข้อมูล
   - Anemic Model ทำให้ Business Logic กระจายอยู่ใน Service ซึ่งเสี่ยงต่อการทำข้อมูลเสียหายหากมีการแก้ไขข้อมูลโดยตรง
2. **ยากต่อการควบคุม Invariant**:
   - **Invariant** คือกฎที่ต้องรักษาไว้ให้คงอยู่เสมอ เช่น "ยอดเงินในบัญชีห้ามติดลบ"
   - หากใช้ Anemic Model จะต้องคอยตรวจสอบกฎเหล่านี้ใน Service Layer ซึ่งเพิ่มความยุ่งยากและโอกาสเกิดข้อผิดพลาด

**กรณีที่อาจใช้ Anemic Model ใน DDD ได้:**

- หากต้องการสร้าง **Read Model** หรือ **Projection** เพื่อใช้สำหรับแสดงผล (Query)
- ในระบบที่มี **Simple CRUD** หรือไม่มี Business Logic ที่ซับซ้อน

---

### ✅ **2. การใช้ Rich Model ใน DDD**

**Rich Model** สอดคล้องกับหลักการของ DDD เพราะ:

1. **รักษา Encapsulation และ Invariant**:
   - Business Logic อยู่ภายใน Entity หรือ Aggregate
   - ลดความผิดพลาดจากการแก้ไขสถานะ (State) โดยตรง
2. **รองรับการขยาย (Extensibility)**:
   - สามารถเพิ่ม Behavior ได้โดยไม่กระทบต่อส่วนอื่น
   - เหมาะกับระบบที่มีความซับซ้อน เช่น การจัดการธุรกรรม (Transaction) หรือกระบวนการอนุมัติ (Approval Process)

**กรณีที่ควรใช้ Rich Model ใน DDD:**

- เมื่อออกแบบ **Aggregate** ที่มี Business Logic สำคัญ
- ในระบบที่ต้องการควบคุม **Invariant** อย่างเข้มงวด
- หากต้องการใช้ **Domain Event** เพื่อสื่อสารการเปลี่ยนแปลง

---

### ✅ **3. ตัวอย่างการออกแบบ Bank Account ด้วย DDD**

### **✅ Anemic Model (Anti-pattern ใน DDD)**

```go
// Account: Anemic Model
type Account struct {
    ID      string
    Owner   string
    Balance float64
}

// AccountService: Business Logic
type AccountService struct{}

func (s *AccountService) Deposit(account *Account, amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be greater than zero")
    }
    account.Balance += amount
    return nil
}

func (s *AccountService) Withdraw(account *Account, amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be greater than zero")
    }
    if account.Balance < amount {
        return fmt.Errorf("insufficient balance")
    }
    account.Balance -= amount
    return nil
}

```

**ข้อเสียในเชิง DDD:**

- ไม่มีการควบคุมการเปลี่ยนแปลงสถานะใน `Account`
- Invariant (เช่น ยอดเงินติดลบ) ต้องตรวจสอบใน Service ทำให้โค้ดกระจัดกระจาย

---

### **✅ Rich Model (DDD Compliant)**

```go
// Domain Event
type AccountEvent struct {
    Type    string
    AccountID string
    Amount  float64
    Created time.Time
}

// Aggregate Root
type Account struct {
    id      string
    owner   string
    balance float64
    events  []AccountEvent
}

// สร้าง Account ใหม่ (Factory Method)
func NewAccount(id, owner string) *Account {
    return &Account{
        id:    id,
        owner: owner,
    }
}

// Deposit: ฝากเงิน (Business Logic + Invariant)
func (a *Account) Deposit(amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be greater than zero")
    }
    a.balance += amount
    a.addEvent("Deposit", amount)
    return nil
}

// Withdraw: ถอนเงิน (Business Logic + Invariant)
func (a *Account) Withdraw(amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be greater than zero")
    }
    if a.balance < amount {
        return fmt.Errorf("insufficient balance")
    }
    a.balance -= amount
    a.addEvent("Withdraw", amount)
    return nil
}

// ดึงยอดคงเหลือ
func (a *Account) Balance() float64 {
    return a.balance
}

// บันทึก Domain Event
func (a *Account) addEvent(eventType string, amount float64) {
    event := AccountEvent{
        Type:    eventType,
        AccountID: a.id,
        Amount:  amount,
        Created: time.Now(),
    }
    a.events = append(a.events, event)
}

// ดึง Domain Events
func (a *Account) Events() []AccountEvent {
    return a.events
}

func main() {
    account := NewAccount("12345", "John Doe")

    if err := account.Deposit(1000); err != nil {
        log.Fatal(err)
    }

    if err := account.Withdraw(500); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Balance: %.2f\n", account.Balance())
    for _, event := range account.Events() {
        fmt.Printf("Event: %s, Amount: %.2f\n", event.Type, event.Amount)
    }
}

```

**ข้อดีในเชิง DDD:**

- **Encapsulation**: การเปลี่ยนแปลง Balance ถูกควบคุมภายใน Aggregate
- **Invariant Safety**: ตรวจสอบกฎทั้งหมดในตัวโมเดล
- **Domain Event**: รองรับการขยายโดยใช้ Event-Driven Architecture

---

### ✅ **4. Best Practices ในการเลือกใช้งาน DDD**

| ประเด็น                  | Anemic Model                   | Rich Model                        |
| ------------------------ | ------------------------------ | --------------------------------- |
| ความเหมาะสม              | Simple CRUD หรือ Read Model    | Complex Domain + Business Rules   |
| การจัดการ Business Logic | อยู่ใน Service Layer           | อยู่ใน Aggregate                  |
| การควบคุม Invariant      | กระจัดกระจายใน Service         | อยู่ภายใน Aggregate               |
| Domain Event             | ไม่เหมาะ                       | เหมาะสม (ใช้บันทึกการเปลี่ยนแปลง) |
| Extensibility            | ขยายได้ง่ายแต่เพิ่มความซับซ้อน | ขยายได้ดีและรักษา Consistency     |
| Testability              | ง่าย (แยก Data/Logic)          | ต้อง Mock Aggregate (ซับซ้อนขึ้น) |

---

### ✅ **5. สรุป: ควรเลือกแบบไหนใน DDD?**

- **ใช้ Anemic Model**:
  - เมื่อทำ Read Model (Projection)
  - ระบบที่มี Business Logic น้อย เช่น ระบบ CRUD
- **ใช้ Rich Model**:
  - เมื่อออกแบบ Aggregate ที่มี Business Rules
  - ระบบที่ต้องรักษา Invariant เช่น Financial Systems
  - ต้องการรองรับ Domain Event และ Event-Driven Architecture

**Rich Model** เป็นทางเลือกที่สอดคล้องกับหลักการ DDD มากกว่า โดยเฉพาะในระบบที่ต้องการควบคุมข้อมูลและ Business Logic อย่างรัดกุม!
