# authService 함수 사용 예시

## Import 방법

```js
import {
  checkNickname,
  checkEmail,
  signUp,
  signIn,
  signOut,
  deleteAccount,
  getUser,
  getProfile,
  updateNickname,
  updateProfileImg,
  deleteProfileImg,
} from "../services/authService";
```

---

## 회원가입

### 닉네임 중복 확인 `checkNickname`

```js
const { isDuplicate, error } = await checkNickname("닉네임");

if (error) {
  console.error("오류");
} else if (isDuplicate) {
  console.log("이미 사용 중인 닉네임입니다.");
} else {
  console.log("사용 가능한 닉네임입니다.");
}
```

### 이메일 중복 확인 `checkEmail`

```js
const { isDuplicate, error } = await checkEmail("test@example.com");

if (error) {
  console.error("오류");
} else if (isDuplicate) {
  console.log("이미 가입된 이메일입니다.");
} else {
  console.log("사용 가능한 이메일입니다.");
}
```

### 회원가입 `signUp`

```js
const { user, error } = await signUp({
  email: "test@example.com",
  password: "password1234",
  nickname: "이름",
});

if (error) {
  if (error.message.includes("already registered")) {
    console.log("이미 가입된 이메일입니다.");
  } else {
    console.log("오류가 발생했습니다.");
  }
} else {
  console.log("회원가입 완료", user);
}
```

---

## 로그인

### `signIn`

```js
const { user, error } = await signIn({
  email: "test@example.com",
  password: "password1234",
});

if (error) {
  if (error.message.includes("Invalid login credentials")) {
    console.log("이메일 또는 비밀번호가 일치하지 않습니다.");
  } else {
    console.log("오류가 발생했습니다.");
  }
} else {
  console.log("로그인 성공", user);
}
```

---

## 로그아웃

### `signOut`

```js
const { success, error } = await signOut();

if (error) {
  console.error("로그아웃 실패");
} else {
  console.log("로그아웃 완료");
  // 홈으로 이동 등... 후속 처리
}
```

---

## 회원 탈퇴

### `deleteAccount`

```js
// 탈퇴 전 재확인 로직은 프론트에서 처리
const { success, error } = await deleteAccount();

if (error) {
  console.error("회원 탈퇴 실패");
} else {
  console.log("탈퇴 완료");
  // 로그인 페이지로 이동 등... 후속 처리
}
```

---

## 프로필 관리

### 현재 로그인된 유저 가져오기 `getUser`

```js
const { user, error } = await getUser();

if (error) {
  console.log("로그인이 필요합니다.");
} else {
  console.log("현재 유저:", user);
  // user.id, user.email 등 사용 가능
}
```

### 프로필 조회 `getProfile`

```js
const { profile, error } = await getProfile();

if (error) {
  console.error("프로필 조회 실패");
} else {
  console.log("닉네임:", profile.nickname);
  console.log("프로필 사진:", profile.img);
}
```

### 닉네임 수정 `updateNickname`

```js
const { success, error } = await updateNickname("새_닉네임");

if (error) {
  if (error.message.includes("unique")) {
    console.log("이미 사용 중인 닉네임입니다.");
  } else {
    console.log("오류가 발생했습니다.");
  }
} else {
  console.log("닉네임이 변경됐습니다.");
}
```

### 프로필 사진 업로드/수정 `updateProfileImg`

```js
// input[type="file"]에서 받은 file 객체를 넘겨줍니다
const file = e.target.files[0];

const { url, error } = await updateProfileImg(file);

if (error) {
  console.error("사진 업로드 실패");
} else {
  console.log("업로드된 사진 URL:", url);
}
```

### 프로필 사진 삭제 `deleteProfileImg`

```js
const { success, error } = await deleteProfileImg();

if (error) {
  console.error("사진 삭제 실패");
} else {
  console.log("프로필 사진이 삭제됐어요.");
}
```

---

## 반환값 구조 요약

| 함수               | 성공 시 반환               | 실패 시 반환 |
| ------------------ | -------------------------- | ------------ |
| `checkNickname`    | `{ isDuplicate: boolean }` | `{ error }`  |
| `checkEmail`       | `{ isDuplicate: boolean }` | `{ error }`  |
| `signUp`           | `{ user }`                 | `{ error }`  |
| `signIn`           | `{ user }`                 | `{ error }`  |
| `signOut`          | `{ success: true }`        | `{ error }`  |
| `deleteAccount`    | `{ success: true }`        | `{ error }`  |
| `getUser`          | `{ user }`                 | `{ error }`  |
| `getProfile`       | `{ profile }`              | `{ error }`  |
| `updateNickname`   | `{ success: true }`        | `{ error }`  |
| `updateProfileImg` | `{ url }`                  | `{ error }`  |
| `deleteProfileImg` | `{ success: true }`        | `{ error }`  |
