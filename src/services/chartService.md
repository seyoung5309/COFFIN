# chartService 함수 사용 예시

## Import 방법

```js
import {
  getAllCoffee,
  searchCoffee,
  getSortedCoffee,
  getPopularCoffee,
  getRandomCoffee,
  getLatestCoffee,
  getCoffeeBySugar,
  getRelatedCoffee,
  getCoffeeByFranchise,
} from "../services/chartService";
```

---

## 커피 전체 목록 불러오기

### `getAllCoffee`

```js
const { data, error } = await getAllCoffee();

if (error) {
  console.error("목록 불러오기 실패");
} else {
  console.log("커피 목록:", data);
}
```

---

## 검색에 따른 커피 목록 불러오기

### `searchCoffee`

```js
const { data, error } = await searchCoffee("아메리카노");

if (error) {
  console.error("검색 실패");
} else {
  console.log("검색 결과:", data);
}
```

> 키워드가 커피 이름에 포함되면 반환한다. (대소문자 구분 없음)

---

## 정렬에 따른 커피 목록 불러오기

### `getSortedCoffee`

```js
const { data, error } = await getSortedCoffee("highCaffeine");

if (error) {
  console.error("정렬 실패");
} else {
  console.log("정렬된 커피 목록:", data);
}
```

#### 정렬 옵션

| sortType         | 설명                      |
| ---------------- | ------------------------- |
| `"highCaffeine"` | 고카페인순                |
| `"lowCaffeine"`  | 저카페인순                |
| `"popular"`      | 인기순 (즐겨찾기 수 기준) |
| `"latest"`       | 최신순                    |
| `"highPrice"`    | 고가순                    |
| `"lowPrice"`     | 저가순                    |
| `"nameAsc"`      | 가나다순                  |

---

## 인기순 커피 목록 불러오기

### `getPopularCoffee`

```js
const { data, error } = await getPopularCoffee();

if (error) {
  console.error("인기순 불러오기 실패");
} else {
  console.log("인기 커피 목록:", data);
  // data[0].likeCount로 즐겨찾기 수 접근 가능
}
```

> `getSortedCoffee("popular")`로도 동일하게 호출할 수 있다.

---

## 랜덤순 커피 목록 불러오기

### `getRandomCoffee`

```js
// 기본 10개 반환
const { data, error } = await getRandomCoffee();

// 개수 지정 가능
const { data, error } = await getRandomCoffee(5);

if (error) {
  console.error("랜덤 불러오기 실패");
} else {
  console.log("랜덤 커피 목록:", data);
}
```

---

## 최신순 커피 목록 불러오기

### `getLatestCoffee`

```js
const { data, error } = await getLatestCoffee();

if (error) {
  console.error("최신순 불러오기 실패");
} else {
  console.log("최신 커피 목록:", data);
}
```

---

## 당류순 커피 목록 불러오기

### `getCoffeeBySugar`

```js
const { data, error } = await getCoffeeBySugar();

if (error) {
  console.error("당류순 불러오기 실패");
} else {
  console.log("당류 높은 순 커피 목록:", data);
}
```

---

## 연관 커피 목록 불러오기

### `getRelatedCoffee`

```js
const { data, error } = await getRelatedCoffee("바닐라 라떼");

if (error) {
  console.error("연관 커피 불러오기 실패");
} else {
  console.log("연관 커피 목록:", data);
  // "바닐라", "라떼" 키워드가 포함된 커피 반환
  // 자기 자신("바닐라 라떼")은 제외됨
}
```

> 띄어쓰기 기준으로 키워드를 분리한다. 한 글자 키워드는 제외된다.

---

## 프랜차이즈에 따른 커피 목록 불러오기

### `getCoffeeByFranchise`

```js
const { data, error } = await getCoffeeByFranchise(1);
// 1 → franchise 테이블의 id값

if (error) {
  console.error("프랜차이즈 커피 불러오기 실패");
} else {
  console.log("프랜차이즈 커피 목록:", data);
  // data[0].price, data[0].caffeine, data[0].link 접근 가능
}
```

---

## 반환값 구조 요약

| 함수                   | 성공 시 반환                                      | 실패 시 반환 |
| ---------------------- | ------------------------------------------------- | ------------ |
| `getAllCoffee`         | `{ data: Coffee[] }`                              | `{ error }`  |
| `searchCoffee`         | `{ data: Coffee[] }`                              | `{ error }`  |
| `getSortedCoffee`      | `{ data: Coffee[] }`                              | `{ error }`  |
| `getPopularCoffee`     | `{ data: Coffee[] }` (likeCount 포함)             | `{ error }`  |
| `getRandomCoffee`      | `{ data: Coffee[] }`                              | `{ error }`  |
| `getLatestCoffee`      | `{ data: Coffee[] }`                              | `{ error }`  |
| `getCoffeeBySugar`     | `{ data: Coffee[] }`                              | `{ error }`  |
| `getRelatedCoffee`     | `{ data: Coffee[] }`                              | `{ error }`  |
| `getCoffeeByFranchise` | `{ data: Coffee[] }` (caffeine, price, link 포함) | `{ error }`  |

---

## Coffee 객체 구조

```js
{
  id: 1,
  name: "아메리카노",
  intro: "진한 에스프레소에 물을 더한 커피",
  caffeine: 125.0,
  saturated_fat: 0.0,
  sugar: 0.0,
  natrium: 1.5,
  protein: 1.0,
  img: "https://...",
  created_at: "2026-03-31T00:00:00+00:00",

  // getCoffeeByFranchise 사용 시 추가
  price: 4500,
  link: "https://...",

  // getPopularCoffee 사용 시 추가
  likeCount: 32,
}
```
