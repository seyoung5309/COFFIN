# coffeeDetailService 함수 사용 예시

## Import 방법

```js
import {
  getCoffeeDetail,
  getRelatedCoffeeForDetail,
} from "../services/coffeeService";
```

---

## 커피 상세 정보 불러오기 (연관 데이터 포함)

### `getCoffeeDetail`

```js
const { data, error } = await getCoffeeDetail(1);

if (error) {
  console.error("상세 정보 불러오기 실패");
} else {
  console.log("커피 상세 정보:", data);
  // data.coffee_franchise → 프랜차이즈별 가격/카페인/링크
  // data.coffee_category → 소속 카테고리 목록
  // data.comment → 최신순으로 정렬된 댓글 목록 (likeCount 포함)
}
```

> 존재하지 않는 `coffeeId`를 전달하면 `.single()` 특성상 에러가 반환된다.

#### 함께 불러오는 연관 데이터

| 필드               | 설명                                                                              |
| ------------------ | --------------------------------------------------------------------------------- |
| `coffee_franchise` | 프랜차이즈별 `caffeine`, `price`, `link`, `franchise { id, name }`                |
| `coffee_category`  | 해당 커피가 속한 `category { id, name }` 목록                                     |
| `comment`          | 최신순 정렬된 댓글 목록. 각 댓글에 `likeCount` 추가, 원본 `comment_like`는 제거됨 |

---

## 커피 상세 페이지용 연관 커피 불러오기

### `getRelatedCoffeeForDetail`

```js
const { data, error } = await getRelatedCoffeeForDetail(1, "바닐라 라떼");

if (error) {
  console.error("연관 커피 불러오기 실패");
} else {
  console.log("연관 커피 목록:", data);
}
```

> 이 함수는 내부 조회 중 에러가 발생해도 항상 `{ data }` 형태로만 반환한다. `error`는 항상 `undefined`이다.

#### 동작 순서

1. **카테고리 기준 매칭 (1차)**
   전달한 `coffeeId`가 속한 카테고리를 먼저 조회하고, 같은 카테고리에 속한 다른 커피를 찾는다. 결과가 1개 이상이면 여기서 바로 반환한다.
2. **이름 키워드 매칭 (2차)**
   카테고리가 없거나 1차 조회 결과가 없을 때만 실행된다. `coffeeName`을 띄어쓰기로 분리한 뒤, 두 글자 이상인 키워드로 이름 포함 검색(`ilike`)을 수행한다. 키워드가 하나도 없으면 빈 배열을 반환한다.

> 두 단계 모두 결과는 `id` 기준으로 중복 제거되며, 자기 자신(`coffeeId`)은 결과에서 제외된다.

---

## 반환값 구조 요약

| 함수                        | 성공 시 반환                        | 실패 시 반환                      |
| --------------------------- | ----------------------------------- | --------------------------------- |
| `getCoffeeDetail`           | `{ data: CoffeeDetail }`            | `{ error }`                       |
| `getRelatedCoffeeForDetail` | `{ data: Coffee[] }` (빈 배열 가능) | 없음 (`error`는 항상 `undefined`) |

---

## CoffeeDetail 객체 구조

```js
{
  id: 1,
  name: "바닐라 라떼",
  intro: "라떼에 바닐라를 넣은.",
  caffeine: 205.0,
  saturated_fat: 0.0,
  sugar: 0.0,
  natrium: 1.5,
  protein: 1.0,
  img: "https://...",
  created_at: "2026-06-16T00:00:00+00:00",

  coffee_franchise: [
    {
      caffeine: 205.0,
      price: 5700,
      link: "https://...",
      franchise: { id: 1, name: "투썸플레이스" },
    },
  ],

  coffee_category: [
    {
      category: { id: 1, name: "라떼" },
    },
  ],

  comment: [
    {
      id: 10,
      comment_text: "바닐라 라떼는 무조건 핫이어야 맛있어요",
      created_at: "2026-06-16T00:00:00+00:00",
      user_id: "uuid-...",
      profile: { nickname: "530", img: "https://..." },
      likeCount: 3,
    },
    // created_at 기준 내림차순(최신순) 정렬됨
  ],
}
```

> `getRelatedCoffeeForDetail`이 반환하는 객체는 별도 가공 없이 `coffee` 테이블의 원본 컬럼 그대로이며, 기존 `Coffee` 객체 구조와 동일하다.
