# [ Week 1 ] Todo List Refactoring

> **동료학습**을 통해서 팀에서 생각한 원티드 프리온보딩 프론트엔드 인턴십 선발 과제의 **Best Pratice**를 만들고 제출해주세요

<img src = https://camo.githubusercontent.com/431cb39804ef7c333ffa8b0dfec7e24581654e84e3c8bcf91f64a43158c3156c/68747470733a2f2f7374617469632e77616e7465642e636f2e6b722f696d616765732f6576656e74732f323930392f62333539313861362e6a7067 />

## 기본 사항

- 배포 링크 : TODO
- 진행 기간 : 2023.08.22. ~ 2023.08.24.

## 실행 방법

```
$ git clone https://github.com/wanted-internship-12-9/pre-onboarding-12th-1-9.git
$ npm install
$ npm start
```

## 기술 스택

### 개발

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge"> 
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge"> 
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge"> 
<img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge">

### 일관성 있는 코드

<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge"> 
<img src="https://img.shields.io/badge/esLint-4B32C3?style=for-the-badge"> 
<img src="https://img.shields.io/badge/husky-273A60?style=for-the-badge">

## 팀 협업

[Team Convention 정의](https://github.com/wanted-internship-12-9/pre-onboarding-12th-1-9/wiki/Team-Convention)

## 디렉토리 구조

```
📦src
 ┣ 📂api
 ┣ 📂components
 ┃ ┣ 📂AuthLayout
 ┃ ┗ 📂Layout
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂ErrorPage
 ┃ ┣ 📂RootPage
 ┃ ┣ 📂SignInPage
 ┃ ┣ 📂SignUpPage
 ┃ ┗ 📂TodoPage
 ┣ 📂routes
 ┣ 📂styles
 ┣ 📂types
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```

## Best Practice 선정 과정

- 각자 Assignment별로 구현한 방법과 특이사항 기록하기
- 토의를 통해 Assignment별로 Best Practice를 선정하여 리팩토링

### 유효성 검사

> 이메일과 비밀번호는 `정규 표현식으로 검증하기`
>
> - 이메일 조건: 추후 확장성을 고려하여 includes 메서드 사용 보단 `정규표현식으로 검증`
> - 비밀번호 조건: 이메일 검증과의 통일성을 위해 `정규표현식 이용`
> - 버튼 disabled: email, password에 대한 유효성 검증 후 처리

### 페이지 이동/ jwt 관리

> - 페이지 이동: react-router-dom의 useNavigate hook을 사용하여 페이지 이동 처리<br/>
> - jwt 관리: response로 받은 accessToken을 localStorage로 관리

### 리다이렉트

> `컴포넌트를 반환하는 컴포넌트인 HOC(Higher Order Component)를 사용하여 화면 깜빡임 현상, 성능저하 가능성 해결`
>
> - useEffect: 렌더링 후 리다이렉트가 되므로, 화면이 깜빡이는 현상 발생
> - useLayoutEffect: 렌더링과 페인팅 사이에 실행되어 깜빡이는 현상은 해결되었으나, 성능 저하 가능성 발생([리액트 공식문서: useLayoutEffect](https://react.dev/reference/react/useLayoutEffect))

> - localStorage의 aceessToken 유무에 따라 리다이렉트 혹은 원래 페이지 이동

### 투두 리스트 목록과 체크박스

> - get 요청으로 받은 todos 데이터 처리
>   - props drilling depth가 3 이하로 contextAPI보다 props 전달을 통한 상태 관리가 더 효율적이라 판단
>   - compound 패턴은 코드 통일성을 고려하여 사용하지 않기로 결정

### 투두 리스트 추가

> `post 요청 후 get 요청을 통해 todos를 리렌더링하는 방식으로 결정`(비관 업데이트)
>
> - 낙관적 업데이트: 서버에 보낸 요청이 정상적일 것이라고 기대하고 클라이언트에서 미리 데이터를 추가하는 방식
> - 비관적 업데이트: 서버에 요청을 보내고, 서버에서 응답을 받은 후에 클라이언트에서 데이터를 추가하는 방식

### 투두 리스트,체크박스 수정

> `put 요청 후 클라이언트에서 상태 변경 후, get 요청을 통해 todo를 리렌더링하는 방식으로 결정`(비관 업데이트)
>
> - todo 수정에 한해서는 get 요청 하나로만 처리하기 보다는 낙관적 업데이트를 동시에 사용 하여 사용자 경험을 개선(빠른 피드백 제공)하고, 동시에 서버와 동일한 상태를 유지

> **✅ 수정할 때 낙관적 업데이트에 맡긴 이유?**  
> <img width="360px" src="https://velog.velcdn.com/images/donggoo/post/dabd6045-3f3b-477a-9ac1-4fa430be00e6/image.gif"/>
>
> - TODO 생성, 읽기, 수정, 삭제를 할 때마다 서버의 상태를 다시 가져오는 함수를 호출했었는데, 수정의 경우 이전TODO가 깜빡이고 수정한 TODO가 보이는 문제가 발생
> - 이 문제를 해결하기 위해서, `useState`훅을 사용해서 클라이언트 상태로 수정된 TODO를 보여주는 방식으로 결정

### 투두 리스트 삭제

> `delete 요청 후 get 요청을 통해 todos를 리렌더링하는 방식으로 결정`(비관 업데이트)

### 기타 사항

#### 1. alert, confirm, prompt 모달 사용 지양

> - alert, confirm, prompt 모달은 브라우저에서 제공하는 기본 모달이기 때문에 디자인을 변경할 수 없다.(확장성이 떨어짐)
> - 로그인 및 회원가입의 경우 UX를 고려하여 error 모달이 아닌, 하단 text를 표시하는 방식으로 결정

#### 2. 에러 메시지 처리

> - 서버에서 받아온 response의 메시지 그대로 사용

#### 3. Compound pattern

> - props drilling을 해결하기 위한 방법으로 Compound pattern을 사용할 수 있지만, todoItem이 자체적으로 delete에 대한 역할을 수행하기 때문에 사용하지 않기로 결정
> - 추후 프로젝트에서 적용해보기로 결정
