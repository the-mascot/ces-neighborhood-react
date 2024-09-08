## ces-neighborhood-react
- __The-Mascot의 개발 연습용 익명 게시판 프로젝트__
- 같은 컨셉의 익명 게시판 프로젝트를 기술 스택 별로 여러개 생성중입니다.
- 이 프로젝트는 ces-neighborhood-blind 프로젝트의 프론트엔드 프로젝트입니다.
- 게시판 화면은 퍼블은 블라인드 게시판을 레퍼하였습니다.

## start
- 설치 : yarn install
- 시작 : yarn start
- 환경 별 build : yarn build:dev
- lint 수정 : yarn lint:fix

## 연관 프로젝트
- bes-neighborhood-blind: thymeleaf + Spring Boot 2.6.12 + Mabatis 백엔드 프로젝트
- bes-neighborhood-vue: vue.js 프론트 프로젝트
- ces-neighborhood-blind: Spring Boot 3.1.5 + JPA 백엔드 프로젝트    
- **ces-neighborhood-react**: react 프론트 프로젝트

---

## 개발환경
- front-end: __React + Typescript__
- node: node 20.11.0
- 상태관리: redux
- 컴포넌트: material UI
- CSS: @emotion/sytled

## 주요사용기술
- redux: 상태관리 라이브러리
- react-query: API 비동기처리
- react-hook-form: Form 데이터 처리
- axios
- eslint + prettier
- Material UI
- env-cmd: 환경 별 build
- react-app-rewired: webpack override
- debounce: debounce 기법 적용
