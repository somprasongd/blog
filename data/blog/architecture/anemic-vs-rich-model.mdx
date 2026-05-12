---
title: 'Anemic Model vs Rich Model'
date: '2025-03-08'
lastmod: '2025-03-08'
tags: ['model', 'go', 'architecture']
draft: false
summary: 'ในสถาปัตยกรรมซอฟต์แวร์ การออกแบบโมเดลข้อมูลมี 2 แนวทางหลักที่พบบ่อย คือ Anemic Model และ Rich Model'
---

# Anemic Model vs Rich Model

ในสถาปัตยกรรมซอฟต์แวร์ การออกแบบโมเดลข้อมูลมี 2 แนวทางหลักที่พบบ่อย คือ **Anemic Model** และ **Rich Model** ทั้งสองแนวทางนี้มีข้อดี-ข้อเสียแตกต่างกันไป ขึ้นอยู่กับความซับซ้อนของระบบและหลักการออกแบบที่ต้องการใช้

ในบทความนี้ เราจะอธิบายความแตกต่างระหว่าง **Anemic Model** และ **Rich Model** พร้อมตัวอย่างโค้ดในภาษา **Go** โดยใช้ **Use Case** เดียวกันเพื่อเปรียบเทียบแนวทางทั้งสอง และนำเสนอ **Best Practices** สำหรับการเลือกใช้งานในแต่ละกรณี

---

## **1. ความหมายของ Anemic Model และ Rich Model**

### ✅ **Anemic Model**

เป็นรูปแบบที่เน้นการแยก **Data** ออกจาก **Behavior** (Business Logic) โดยโมเดลจะมีเพียง **Field** หรือ **Property** ที่ใช้เก็บข้อมูล และตรรกะทั้งหมดจะอยู่ใน **Service Layer** แทน

**ข้อดี:**

- เข้าใจง่าย เหมาะกับระบบที่มีความซับซ้อนน้อย
- แยก Business Logic ออกจาก Data ทำให้โครงสร้างชัดเจน

**ข้อเสีย:**

- เสี่ยงต่อการละเมิด **Encapsulation**
- อาจทำให้ Service Layer มีขนาดใหญ่และจัดการยาก
- มีแนวโน้มเกิด **Code Duplication** เพราะ Business Logic ถูกกระจายไปหลาย Service

---

### ✅ **Rich Model**

เป็นรูปแบบที่รวม **Data** และ **Behavior** ไว้ในโมเดลเดียวกัน โดยโมเดลมีหน้าที่รักษาสถานะ (State) ของตัวเอง และมีฟังก์ชันที่ทำงานกับข้อมูลโดยตรง

**ข้อดี:**

- รักษา **Encapsulation** ได้ดี
- ลดการทำซ้ำของ Business Logic
- โค้ดอ่านง่ายขึ้น เพราะตรรกะอยู่ใกล้กับข้อมูล

**ข้อเสีย:**

- มีความซับซ้อนมากขึ้นหากโมเดลขยายใหญ่
- หากไม่จัดการดี อาจเกิดการผูกมัด (Coupling) ระหว่างโมดูล

---

## **2. Use Case: การจัดการยอดคงเหลือในบัญชี (Bank Account Management)**

โจทย์:

1. ผู้ใช้สามารถเปิดบัญชีใหม่ได้
2. สามารถฝากเงินและถอนเงินได้
3. ยอดเงินในบัญชีต้องไม่ติดลบ

---

## **3. ตัวอย่างการใช้งาน Anemic Model**

### ✅ **โครงสร้าง**

- `Account` (Data Model)
- `AccountService` (Business Logic)

```go
// Account: Data Model (Anemic Model)
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

func main() {
    account := &Account{
        ID:    "12345",
        Owner: "John Doe",
    }

    service := &AccountService{}

    // ฝากเงิน
    if err := service.Deposit(account, 1000); err != nil {
        log.Fatal(err)
    }

    // ถอนเงิน
    if err := service.Withdraw(account, 500); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Account balance: %.2f\n", account.Balance)
}

```

**ข้อสังเกต:**

- Business Logic ทั้งหมดอยู่ใน `AccountService`
- `Account` เป็นเพียงโครงสร้างข้อมูล ไม่มีพฤติกรรมใด ๆ
- ทุกครั้งที่มีการเปลี่ยนแปลงข้อมูล ต้องผ่าน Service

---

## **4. ตัวอย่างการใช้งาน Rich Model**

### ✅ **โครงสร้าง**

- `Account` (Rich Model)

```go
// Account: Rich Model (Data + Behavior)
type Account struct {
    id      string
    owner   string
    balance float64
}

// สร้าง Account ใหม่ (Factory Method)
func NewAccount(id, owner string) *Account {
    return &Account{
        id:    id,
        owner: owner,
    }
}

// ฝากเงิน
func (a *Account) Deposit(amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be greater than zero")
    }
    a.balance += amount
    return nil
}

// ถอนเงิน
func (a *Account) Withdraw(amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be greater than zero")
    }
    if a.balance < amount {
        return fmt.Errorf("insufficient balance")
    }
    a.balance -= amount
    return nil
}

// ดึงยอดคงเหลือ
func (a *Account) Balance() float64 {
    return a.balance
}

func main() {
    account := NewAccount("12345", "John Doe")

    if err := account.Deposit(1000); err != nil {
        log.Fatal(err)
    }

    if err := account.Withdraw(500); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Account balance: %.2f\n", account.Balance())
}

```

**ข้อสังเกต:**

- ตรรกะทั้งหมดอยู่ภายใน `Account`
- ควบคุมการเข้าถึง Field ผ่าน Method ต่าง ๆ (Encapsulation)
- ลดการทำซ้ำของ Business Logic

---

## **5. เมื่อไหร่ควรใช้ Anemic Model vs Rich Model?**

| เกณฑ์                     | Anemic Model                 | Rich Model                |
| ------------------------- | ---------------------------- | ------------------------- |
| ความซับซ้อน (Complexity)  | เหมาะกับระบบที่เรียบง่าย     | เหมาะกับระบบที่ซับซ้อน    |
| การจัดการ Business Logic  | อยู่ใน Service Layer         | อยู่ในตัวโมเดลเอง         |
| การรักษาสถานะ (State)     | บริหารโดย Service Layer      | บริหารโดยตัวโมเดล         |
| การทดสอบ (Testability)    | แยกการทดสอบง่าย              | ต้อง Mock โมเดลหากซับซ้อน |
| การขยายระบบ (Scalability) | ขยายง่ายกว่าเมื่อแยก Service | ยากขึ้นถ้าโมเดลมีขนาดใหญ่ |

---

## **6. Best Practices ในการเลือกใช้งาน**

1. **ใช้ Anemic Model** เมื่อ:
   - ระบบมี Business Logic น้อย
   - ต้องการแยก **Data** และ **Behavior** ออกจากกันเพื่อความชัดเจน
   - ต้องการลด Coupling ระหว่างโมดูล
2. **ใช้ Rich Model** เมื่อ:
   - ระบบมี Business Logic ซับซ้อนและเฉพาะเจาะจง
   - ต้องการให้โมเดลจัดการ State ของตัวเอง
   - เน้น **Encapsulation** เพื่อป้องกันข้อมูลไม่ให้ถูกแก้ไขโดยตรง

---

## **สรุป**

- **Anemic Model** เหมาะสำหรับระบบที่มีความซับซ้อนต่ำและต้องการแยก Business Logic ออกจากโมเดล
- **Rich Model** เหมาะสำหรับระบบที่ต้องการรวมข้อมูลและพฤติกรรมเข้าด้วยกันเพื่อให้โมเดลควบคุมการเปลี่ยนแปลงของตัวเอง

ทั้งสองแนวทางมีข้อดี-ข้อเสีย การเลือกใช้งานขึ้นอยู่กับลักษณะของระบบและความต้องการทางธุรกิจเป็นสำคัญ!
