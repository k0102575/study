# React Query Structural Sharing 학습 프로젝트

React Query의 **구조적 공유(Structural Sharing)** 원리를 이해하기 위한 실험 프로젝트입니다.

---

## 📚 학습 목표

1. **구조적 공유(Structural Sharing)란 무엇인가?**
2. **replaceEqualDeep 함수의 동작 원리**
3. **React.memo와 구조적 공유의 관계**
4. **참조 동일성(Reference Equality)과 불변성(Immutability)**

---

## 🎯 구조적 공유(Structural Sharing)란?

구조적 공유는 **값이 바뀐 부분만 새로 만들고, 나머지는 기존 참조를 재사용**하는 최적화 기법입니다.

### 예시

```ts
const prev = {
  user: { name: 'kim', age: 30 },
  meta: { updatedAt: 123456 },
};

const next = {
  user: { name: 'kim', age: 30 },
  meta: { updatedAt: 999999 }, // 변경됨
};

const result = replaceEqualDeep(next, prev);

// 결과:
// result.user === prev.user (true) ← user는 값이 같으니 기존 참조 재사용
// result.meta === prev.meta (false) ← meta는 값이 다르니 새로운 객체 생성
```

---

## 🔍 replaceEqualDeep 함수 분석

### 핵심 로직

```ts
export function replaceEqualDeep(a: any, b: any): any {
  // 1. 참조가 같으면 a를 반환 (이미 동일한 객체)
  if (a === b) return a;

  const array = isPlainArray(a) && isPlainArray(b);

  if (array || (isPlainObject(a) && isPlainObject(b))) {
    // 2. 객체/배열인 경우, 재귀적으로 비교
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy: any = array ? [] : {};
    const aItemsSet = new Set(aItems);
    let equalItems = 0;

    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if (
        ((!array && aItemsSet.has(key)) || array) &&
        a[key] === undefined &&
        b[key] === undefined
      ) {
        copy[key] = undefined;
        equalItems++;
      } else {
        // 3. 재귀적으로 하위 값 비교
        copy[key] = replaceEqualDeep(a[key], b[key]);

        // 4. 하위 값이 a와 동일한 참조면 equalItems 증가
        if (copy[key] === a[key] && a[key] !== undefined) {
          equalItems++;
        }
      }
    }

    // 5. 모든 하위 값이 a와 동일하면 a를 반환 (기존 참조 재사용)
    return aSize === bSize && equalItems === aSize ? a : copy;
  }

  // 6. 객체/배열이 아니면 b를 반환
  return b;
}
```

### 동작 원리

1. **참조가 같으면** → `a` 반환 (최적화)
2. **객체/배열이면** → 재귀적으로 하위 값 비교
3. **모든 하위 값이 동일하면** → `a` 반환 (기존 참조 재사용)
4. **하나라도 다르면** → 새로운 객체 생성

---

## 🧪 실험 결과

### 최초 렌더링 (버튼 클릭 전)

```
prev  {"user":{"name":"kim","age":30},"meta":{"updatedAt":123456}}
next  {"user":{"name":"kim","age":30},"meta":{"updatedAt":999999}}
🔍 전체 객체 동일? false
🔍 user 참조 동일? true   ← user는 값이 같아서 prev.user 재사용
🔍 meta 참조 동일? false  ← meta는 값이 달라서 새로 생성
👤 UserInfo 렌더링
📦 MetaInfo 렌더링
```

**분석:**

- `prev`와 `next`의 `meta.updatedAt`이 다름
- `user`는 값이 같으므로 `prev.user`의 참조를 재사용
- `meta`는 값이 다르므로 새로운 객체 생성
- 전체 객체도 일부가 바뀌었으므로 새로운 객체

---

### 버튼 클릭 후 (setPrev(next))

```
prev  {"user":{"name":"kim","age":30},"meta":{"updatedAt":999999}}
next  {"user":{"name":"kim","age":30},"meta":{"updatedAt":999999}}
🔍 전체 객체 동일? true   ← 모든 값이 같아서 prev 자체를 반환
🔍 user 참조 동일? true
🔍 meta 참조 동일? true
👤 UserInfo 렌더링
📦 MetaInfo 렌더링
```

**분석:**

- `setPrev(next)` 이후, `prev`와 `next`가 값이 완전히 동일
- `replaceEqualDeep(next, prev)`는 **모든 값이 같으면 prev 자체를 반환**
- 즉, `result === prev` (참조가 동일)
- 이것이 구조적 공유의 핵심!

---

## ❓ 왜 React.memo가 리렌더를 막지 못할까?

### 현상

- `result.user`, `result.meta`의 참조가 같아도  
  `UserInfo`, `MetaInfo` 컴포넌트가 다시 렌더링됨

### 원인

**React.memo는 함수 호출 자체를 막지 않습니다.**

- React.memo는 **props가 같으면 화면 갱신(DOM diff/apply)을 막는다**
- 하지만 **함수 컴포넌트의 본문 호출**은 여전히 발생
- 즉, `console.log`는 찍히지만, **실제 DOM 업데이트는 일어나지 않음**

### React 공식 문서

> React will still call the function component.  
> If the props are the same, React will skip rendering the component's children, and reuse the last rendered result.

즉, **함수는 호출되지만, 실제로는 화면 갱신이 일어나지 않는다**는 뜻입니다.

---

## 🔑 핵심 개념 정리

### 1. 구조적 공유의 목적

- **불필요한 객체 생성을 줄여 메모리 최적화**
- **참조 동일성을 유지해 React.memo, useMemo 등의 효율성 향상**

### 2. replaceEqualDeep의 핵심

- 값이 같으면 → 기존 참조 재사용 (이전 객체 반환)
- 값이 다르면 → 새로운 객체 생성
- 재귀적으로 하위 객체도 동일하게 처리

### 3. React.memo와의 관계

- React.memo는 props의 **얕은 비교(===)**로 리렌더 여부 결정
- 구조적 공유로 참조가 유지되면 → React.memo가 리렌더를 막을 수 있음
- 하지만 함수 호출(console.log)은 여전히 발생

### 4. "렌더링"의 의미

- **Render Phase:** 함수 컴포넌트 호출 (console.log 찍힘)
- **Commit Phase:** 실제 DOM 업데이트 (화면 갱신)
- React.memo는 Commit Phase를 막지만, Render Phase는 막지 않음

---

## 🛠️ 프로젝트 구조

```
structural-sharing/
├── src/
│   ├── App.tsx          # 구조적 공유 테스트 컴포넌트
│   ├── utils.ts         # replaceEqualDeep 함수 (React Query에서 추출)
│   ├── type.ts          # TypeScript 타입 정의
│   └── main.tsx         # 엔트리 포인트
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 사용 기술

- **React 18**
- **TypeScript**
- **Vite**
- **React Query의 utils.ts** (구조적 공유 로직)

---

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 버튼 클릭 후 콘솔 확인
```

---

## 📖 참고 자료

- [React Query 공식 문서 - Structural Sharing](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults#structural-sharing)
- [React Query GitHub - utils.ts](https://github.com/TanStack/query/blob/main/packages/query-core/src/utils.ts)
- [React 공식 문서 - React.memo](https://react.dev/reference/react/memo)

---

## 💡 학습 포인트

1. **구조적 공유는 "값이 바뀐 부분만 새로 만들고, 나머지는 기존 참조를 재사용"**
2. **replaceEqualDeep은 재귀적으로 비교해서 모든 값이 같으면 이전 객체를 반환**
3. **React.memo는 함수 호출은 막지 않지만, 실제 DOM 업데이트는 막는다**
4. **React Query는 내부적으로 구조적 공유를 사용해 캐시를 최적화한다**

---

## 🤔 추가 실험 아이디어

- [ ] 배열에 대한 구조적 공유 테스트
- [ ] 깊은 중첩 객체에 대한 구조적 공유 테스트
- [ ] React Query의 실제 캐시 동작과 비교
- [ ] 성능 측정 (메모리, 속도)

---

**작성자:** 김승민  
**작성일:** 2025년 10월 22일  
**목적:** React Query의 구조적 공유 원리 학습 및 실험
