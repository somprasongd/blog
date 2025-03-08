---
title: 'การออกแบบฟังก์ชัน "โอนเงิน" ในระบบ DDD (Transfer Money Use Case)'
date: '2025-03-08'
lastmod: '2025-03-08'
tags: ['model', 'go', 'architecture'. 'ddd']
draft: false
summary: 'การโอนเงิน (Transfer Money) ในบริบทของ Domain-Driven Design (DDD) เราควรออกแบบอย่างไร'
---

# การออกแบบฟังก์ชัน "โอนเงิน" ในระบบ DDD (Transfer Money Use Case)

เมื่อพูดถึง **การโอนเงิน (Transfer Money)** ในบริบทของ **Domain-Driven Design (DDD)** เราควรออกแบบโดยเน้นที่:

1. **Consistency**: ต้องมั่นใจว่าเงินถูกหักจากต้นทางและเพิ่มที่ปลายทางเสมอ
2. **Invariant**: ตรวจสอบกฎสำคัญ เช่น บัญชีต้องมีเงินเพียงพอก่อนโอน
3. **Transaction Management**: รองรับการ Rollback หากการโอนล้มเหลว
4. **Domain Event**: บันทึกเหตุการณ์สำคัญ เช่น `MoneyTransferred` เพื่อประวัติหรือการทำงานแบบ Event-Driven

---

## ✅ แนวทางการออกแบบฟังก์ชันโอนเงินใน DDD

### กำหนด Business Rules (Invariant)

- บัญชีต้นทางต้องมีเงินเพียงพอ
- จำนวนเงินที่โอนต้องมากกว่า 0
- บันทึกประวัติการโอนเงิน (Domain Event)

---

### ✅ โครงสร้างระบบ (Structure)

```text
- cmd/
  - main.go
- internal/
  - domain/
    - account.go        // Aggregate
    - events.go         // Domain Events
  - application/
    - transfer_service.go // Application Service (Use Case)
  - infrastructure/
    - repository.go     // Interface for Persistence

```

---

### ✅ 1. Domain Layer: ออกแบบ Account Aggregate

```go
// Domain Event: บันทึกการโอนเงิน
type MoneyTransferredEvent struct {
    FromAccountID string
    ToAccountID   string
    Amount        float64
    CreatedAt     time.Time
}

// Account: Aggregate Root
type Account struct {
    id      string
    balance float64
    events  []interface{} // เก็บ Domain Events
}

// Factory Method: สร้างบัญชีใหม่
func NewAccount(id string, balance float64) *Account {
    return &Account{id: id, balance: balance}
}

// Getter: ดึงยอดเงินคงเหลือ
func (a *Account) Balance() float64 {
    return a.balance
}

// Withdraw: หักเงินจากบัญชี (Enforce Invariant)
func (a *Account) Withdraw(amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be positive")
    }
    if a.balance < amount {
        return fmt.Errorf("insufficient balance")
    }
    a.balance -= amount
    return nil
}

// Deposit: ฝากเงินเข้าบัญชี
func (a *Account) Deposit(amount float64) error {
    if amount <= 0 {
        return fmt.Errorf("amount must be positive")
    }
    a.balance += amount
    return nil
}

// RecordEvent: บันทึก Domain Event
func (a *Account) RecordEvent(event interface{}) {
    a.events = append(a.events, event)
}

// GetEvents: ดึง Domain Events
func (a *Account) GetEvents() []interface{} {
    return a.events
}
```

---

### ✅ 2. Application Layer: Transfer Service

```go
// AccountRepository: Interface สำหรับดึงและบันทึกบัญชี
type AccountRepository interface {
    GetByID(ctx context.Context, id string) (*Account, error)
    Save(ctx context.Context, account *Account) error
}

// TransferService: Application Service (Use Case)
type TransferService struct {
    repo AccountRepository
}

// NewTransferService: สร้าง Service
func NewTransferService(repo AccountRepository) *TransferService {
    return &TransferService{repo: repo}
}

// Transfer: โอนเงินระหว่างบัญชี (Transactional)
func (s *TransferService) Transfer(ctx context.Context, fromID, toID string, amount float64) error {
    fromAccount, err := s.repo.GetByID(ctx, fromID)
    if err != nil {
        return fmt.Errorf("from account not found: %w", err)
    }

    toAccount, err := s.repo.GetByID(ctx, toID)
    if err != nil {
        return fmt.Errorf("to account not found: %w", err)
    }

    // 1. ตรวจสอบ Invariant
    if err := fromAccount.Withdraw(amount); err != nil {
        return fmt.Errorf("transfer failed: %w", err)
    }
    if err := toAccount.Deposit(amount); err != nil {
        return fmt.Errorf("transfer failed: %w", err)
    }

    // 2. บันทึก Domain Event
    event := MoneyTransferredEvent{
        FromAccountID: fromID,
        ToAccountID:   toID,
        Amount:        amount,
        CreatedAt:     time.Now(),
    }
    fromAccount.RecordEvent(event)
    toAccount.RecordEvent(event)

    // 3. บันทึกลง Database (Transaction)
    if err := s.repo.Save(ctx, fromAccount); err != nil {
        return fmt.Errorf("failed to save from account: %w", err)
    }
    if err := s.repo.Save(ctx, toAccount); err != nil {
        return fmt.Errorf("failed to save to account: %w", err)
    }

    return nil
}
```

---

### ✅ 3. Infrastructure Layer: Mock Repository (ตัวอย่าง)

```go
type InMemoryAccountRepository struct {
    accounts map[string]*Account
    mu       sync.Mutex
}

func NewInMemoryAccountRepository() *InMemoryAccountRepository {
    return &InMemoryAccountRepository{
        accounts: make(map[string]*Account),
    }
}

func (r *InMemoryAccountRepository) GetByID(_ context.Context, id string) (*Account, error) {
    r.mu.Lock()
    defer r.mu.Unlock()
    acc, exists := r.accounts[id]
    if !exists {
        return nil, fmt.Errorf("account not found")
    }
    return acc, nil
}

func (r *InMemoryAccountRepository) Save(_ context.Context, account *Account) error {
    r.mu.Lock()
    defer r.mu.Unlock()
    r.accounts[account.id] = account
    return nil
}

```

---

### ✅ 4. Main: ทดสอบการโอนเงิน

```go
func main() {
    ctx := context.Background()

    // Initial Setup
    repo := NewInMemoryAccountRepository()
    transferService := NewTransferService(repo)

    acc1 := NewAccount("A123", 1000)
    acc2 := NewAccount("B456", 500)

    repo.Save(ctx, acc1)
    repo.Save(ctx, acc2)

    // ทำรายการโอนเงิน
    if err := transferService.Transfer(ctx, "A123", "B456", 300); err != nil {
        log.Fatalf("Transfer failed: %v", err)
    }

    updatedAcc1, _ := repo.GetByID(ctx, "A123")
    updatedAcc2, _ := repo.GetByID(ctx, "B456")

    fmt.Printf("Balance A123: %.2f\n", updatedAcc1.Balance()) // 700
    fmt.Printf("Balance B456: %.2f\n", updatedAcc2.Balance()) // 800

    for _, e := range updatedAcc1.GetEvents() {
        fmt.Printf("Event: %+v\n", e)
    }
}

```

---

### ✅ 5. Best Practices สำหรับการโอนเงินใน DDD

1. **ใช้ Aggregate** เพื่อควบคุม Business Logic (Withdraw, Deposit)
2. **ตรวจสอบ Invariant** ภายใน Aggregate เท่านั้น
3. **Transactional Consistency**: ใช้ Database Transaction เพื่อป้องกัน Inconsistent State
4. **Domain Event**: บันทึกเหตุการณ์สำคัญเพื่อการตรวจสอบย้อนหลัง
5. **ใช้ Interface** ใน Repository เพื่อรองรับ Testability

---

### ✅ 6. สรุป: เหตุผลที่ควรใช้ Rich Model ในการโอนเงิน

- **Consistency**: ตรวจสอบกฎการโอนภายใน Aggregate
- **Encapsulation**: หลีกเลี่ยงการเปลี่ยนแปลงสถานะโดยตรง
- **Event-Driven**: รองรับการแจ้งเตือนหลังการโอนเงิน
- **Testability**: ออกแบบแยก Layer ช่วยให้ทดสอบได้ง่าย

แนวทางนี้ช่วยให้ระบบมีความถูกต้อง ปลอดภัย และสามารถขยายได้ในอนาคต!
