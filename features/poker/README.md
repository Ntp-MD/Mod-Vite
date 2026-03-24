# 🧪 Poker Game Unit Tests

## 📋 Overview

Test suite สำหรับ Texas Hold'em Poker Game โดยใช้ **Vitest** + **Vue Test Utils**

## 🚀 การรัน Tests

### รัน Tests ทั้งหมด

```bash
npm test
```

### รัน Tests แบบ Watch Mode

```bash
npm test -- --watch
```

### รัน Tests พร้อม Coverage

```bash
npm test -- --coverage
```

### รัน Tests เฉพาะไฟล์

```bash
npm test Table.test.js
npm test HandEvaluation.test.js
```

## 📁 โครงสร้าง Tests

```
src/stores/
├── __tests__/
│   ├── Table.test.js              # Core game logic tests
│   ├── HandEvaluation.test.js     # Hand ranking tests
│   └── AI.test.js                 # AI behavior tests (TODO)
└── Table.js
```

## 🧪 Test Categories

### 1. **Core Functions** (`Table.test.js`)

- ✅ Game initialization
- ✅ Player actions (fold, call, raise, all-in)
- ✅ Game state management
- ✅ Computed properties
- ✅ Logging system

### 2. **Hand Evaluation** (`HandEvaluation.test.js`)

- ✅ Royal Flush detection
- ✅ Straight Flush detection
- ✅ Four of a Kind
- ✅ Full House
- ✅ Flush
- ✅ Straight
- ✅ Three of a Kind
- ✅ Two Pair
- ✅ One Pair
- ✅ High Card
- ✅ 7-card hand evaluation (Texas Hold'em)

### 3. **AI Behavior** (TODO)

- Game phase transitions
- AI decision-making
- Position awareness
- Bluffing logic

### 4. **Side Pots** (TODO)

- Multiple all-in scenarios
- Pot distribution
- Eligibility calculation

## 📊 Coverage Goals

ตั้งเป้า coverage อย่างน้อย:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## 🔧 การเพิ่ม Tests ใหม่

### ตัวอย่าง Test Case:

```javascript
import { describe, it, expect, beforeEach } from "vitest";
import { startGame, resetGame, pot } from "../Table.js";

describe("My Feature", () => {
  beforeEach(() => {
    resetGame();
  });

  it("should do something", () => {
    startGame();
    expect(pot.value).toBeGreaterThan(0);
  });
});
```

## 🐛 Debugging Tests

### แสดงผล Console Logs

```bash
npm test -- --reporter=verbose
```

### รัน Test เดียว

```javascript
it.only("should test specific case", () => {
  // test code
});
```

### Skip Test

```javascript
it.skip("should skip this test", () => {
  // test code
});
```

## 📝 Best Practices

1. **Isolate Tests**: ใช้ `beforeEach` เพื่อ reset state
2. **Clear Names**: ตั้งชื่อ test ให้บอกว่าทดสอบอะไร
3. **One Assertion**: พยายามทดสอบสิ่งเดียวต่อ test case
4. **Mock Timers**: ใช้ `vi.useFakeTimers()` สำหรับ async operations
5. **Test Edge Cases**: ทดสอบกรณีที่ผิดปกติด้วย

## 🎯 Tests ที่ควรเพิ่ม

- [ ] Integration tests สำหรับ game flow
- [ ] AI decision making tests
- [ ] Side pot calculation tests
- [ ] Edge cases (player bust, network errors, etc.)
- [ ] Performance tests
- [ ] E2E tests (Playwright/Cypress)

## 🔗 Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
