## 프로젝트 소개
<img width="187" height="182" alt="image" src="https://github.com/user-attachments/assets/491deb1e-3814-4298-8501-8a1954f568b1" />

***Medict***는 약국과 도매상을 대상으로 한 약품 주문 예측 플랫폼입니다.

약국에게는 약국별 주문 데이터를 기반으로 **맞춤형 약품 주문량 추천**과 **정밀한 예측 데이터**를 제공하며, 도매상에게는 전체 약국의 주문 데이터를 분석하여 **수요 기반 약품 주문 예측 정보**를 제공합니다. 이를 통해 약국 회원들이 약품 주문 시 예측 데이터를 참고하여 **효율적이고 편리하게 주문량을 결정할 수 있도록 지원**하는 것을 목표로 합니다.
<br/><br/>

## Project Architecture

```markdown
codevision-project1 
├── public/ <!--이미지 및 폰트-->
│ ├── assets 
│ ├── fonts
│ └── favicon.ico <!--플랫폼 로고-->
├── src/ 
│ ├── apis/ <!--axios 객체 및 API 함수-->
│ │ ├── auth.ts
│ │ ├── axiosInstance.ts
│ │ ├── cart.ts
│ │ ├── login.ts
│ │ ├── member.ts
│ │ ├── order.ts
│ │ ├── orderLog.ts
│ │ ├── pharmacy.ts
│ │ ├── predictItem.ts
│ │ └── signup.ts
│ ├── components/ 
│ │ ├── common/ <!--공통 컴포넌트-->
│ │ │ ├── Area.tsx
│ │ │ ├── Button.tsx
│ │ │ ├── Header.tsx
│ │ │ ├── Input.tsx
│ │ │ └── Pagination.tsx
│ │ ├── layout/ <!--공통 레이아웃-->
│ │ │ └── Layout.tsx
│ │ ├── modal/ <!--모달창-->
│ │ │ ├── AddressModal.tsx
│ │ │ ├── CartModal.tsx
│ │ │ ├── MemberModal.tsx
│ │ │ ├── NotiModal.tsx
│ │ │ └── WithdrawalModal.tsx
│ │ ├── order/ 
│ │ │ ├── AnalysisList.tsx
│ │ │ ├── Cart.tsx
│ │ │ ├── MedicineDetail.tsx
│ │ │ ├── MedRanking.tsx
│ │ │ ├── NoAnalysisData.tsx
│ │ │ └── NoMedicineDetailData.tsx
│ │ ├── predictItem/
│ │ │ ├── PredictItemList.tsx
│ │ │ └── PredictPharmacyList.tsx
│ │ ├── skeleton/ <!--컴포넌트별 스켈레톤-->
│ │ │ ├── DataListSkeleton.tsx
│ │ │ ├── MedicineDetailSkeleton.tsx
│ │ │ ├── OrderHistorySkeleton.tsx
│ │ │ ├── OrderLogSkeleton.tsx
│ │ │ └── PredictItemSkeleton.tsx
│ ├── pages/ <!--페이지-->
│ │ ├── mypage/
│ │ │ ├── edit.tsx
│ │ │ └── index.tsx
│ │ ├── order/ 
│ │ │ └── index.tsx
│ │ ├── order-history/ 
│ │ │ └── index.tsx
│ │ ├── order-log/
│ │ │ └── index.tsx
│ │ ├── predict-item/
│ │ │ └── index.tsx 
│ │ └── signup/ 
│ │ │ └── index.tsx
│ │ ├── _app.tsx
│ │ ├── _document.tsx
│ │ └── index.tsx
│ ├── store/ <!--전역 상태를 관리하는 함수-->
│ ├── styles/ <!--전역 스타일 정의-->
│ │ └── global.css
│ ├── types/ <!--플랫폼에서 사용하는 타입-->
│ │ ├── cart/
│ │ ├── login/
│ │ ├── member/
│ │ ├── pharmacy
│ │ ├── signup
│ │ ├── wholesaler
│ ├── utils/ <!--플랫폼에서 사용하는 함수-->
│ │ ├── formatDate.ts
│ │ └── utility.ts
```
<br/>

## 기능 요구 사항

> **[컴포넌트] 헤더**
- 약국과 도매상의 회원 구분에 따라 다른 탭이 띄워져야 한다.
    - 약국 : `AI 오늘의 주문` , `주문 내역`
    - 도매상 : `주문 예상 품목` , `주문 내역`
- 회원명 영역을 클릭하면 마이페이지, 로그아웃 버튼이 있는 모달창이 표시된다. 다시 클릭할 경우 모달창이 닫힌다.

> **[페이지] 로그인**
> 
- 사용자가 이메일, 비밀번호를 입력하고 회원 구분을 선택하면 로그인 버튼이 활성화된다.
- 사용자가 로그인 버튼을 눌렀을 때 유효성 검사를 실시하고, 로그인 로직이 동작한다.
    - `회원 존재` - 해당 정보로 로그인을 시도한다.
    - `회원 미존재` - 로그인 실패 모달창을 띄운다.
        - 이메일 미존재
        - 비밀번호 불일치
        - 탈퇴한 사용자
        - 로그인 실패

> **[페이지] 회원가입**
- **회원 구분**
    - 회원은 **`약국`** 과 **`도매상`** 중에 선택하도록 한다.
    - 기본값은 **`약국`** 이다.
- **이메일**
    - 정규식을 활용해, 사용자가 입력한 값이 이메일 조건을 만족하는지 확인한다.
    - 조건에 부합하지 않을 경우 안내 멘트를 영역 하단에 표시한다.
- **비밀번호**
    - 정규식을 활용해 사용자가 입력한 값이  `대소문자/숫자/특수문자 중 3가지 이상 조합, 8~16자` 조건을 만족하는지 확인한다.
    - 조건에 부합하지 않을 경우 안내 멘트를 영역 하단에 표시한다.
- **비밀번호 확인**
    - 비밀번호 확인 입력창까지 입력을 마치고 비밀번호 입력창의 값과 비교하여 일치 여부를 판단한다.
    - 불일치의 경우 안내 멘트를 영역 하단에 표시한다.
- **휴대전화**
    - 010, 011, 016, 017, 018, 019 중에 선택한다.
    - 이후 입력 칸은 4자리의 숫자만 입력 가능하다.
- **취소**
    - `[취소]` 버튼을 누를 경우 이전 페이지인 로그인 페이지로 이동한다.
- **회원가입**
    - 모든 입력 값이 존재하고 입력값들이 조건을 만족할 경우, 서버에 회원 생성을 요청한다.
    - 200 OK 응답을 받을 경우 회원 정보를 생성하고, 사용자에게 회원가입 성공 모달창을 띄운다.

> **[페이지] AI 오늘의 주문**
- 회원 분류가 **`약국`** 인 사용자만이 이용할 수 있다.
- **[오늘의 주문] 버튼**
    - 버튼을 클릭하면 하단 <AI 분석 결과> 영역에 AI가 예측한 주문 예상 품목 리스트가 렌더링된다.
- **AI 분석 결과**
    - 일별, 요일별, 주별, 월별로 구분하여 사용자가 선택한 항목에 대한 데이터가 렌더링된다.
    - 항목별로 약품명, 추천 확률, 회사명, 보험 코드, 단위 별 예측 수량이 나타난다.
    - 리스트 중 하나의 항목을 선택해 <약품 담기> 영역에서 약품 상세 정보를 확인할 수 있다.
- **약품 담기**
    - 사용자가 원하는 약품의 수량을 입력하고 장바구니 버튼을 클릭하면, 약품이 장바구니에 담긴다.
        - 수량이 0일 경우 장바구니에 항목이 추가되지 않는다.
        - 재고 수량을 초과한 수량은 입력하거나 선택할 수 없다.
    - 약품이 장바구니에 담기면 사용자에게 알림창을 보여준다.
- **장바구니**
    - 약품 담기 탭을 통해 선택한 약품들을 보여준다.
    - 약품명, 도매상명, 단위 중 하나라도 다를 경우 다른 아이템으로 추가된다.
    - 아이템마다 존재하는 수량 조절 버튼을 통해 수량을 변경할 수 있다.
    - `[전체 취소]` 버튼을 통해 장바구니에 담긴 모든 아이템들을 삭제할 수 있다.
    - `[주문하기]` 버튼을 통해 장바구니에 담긴 모든 아이템들을 주문할 수 있다.

> **[페이지] 주문 내역**
- 회원 분류가 **`약국`** , **`도매상`** 인 사용자가 이용할 수 있다.
    - **`약국`** 회원은 `/order-history` , **`도매상`** 회원은 `/order-log` 경로를 사용한다.
- **`약국`** **회원의 주문 내역**
    - 약품 주문 목록을 조회할 수 있고, 개별 건 선택 시 하단에서 주문 상세 내역을 조회할 수 있다.
    - 날짜 컴포넌트를 통해 주문 내역 조회 기간을 변경해서 조회할 수 있다.
    - 검색 컴포넌트를 통해 검색어를 입력할 수 있고, 검색어가 포함된 주문 내역을 조회할 수 있다.
    - 페이지네이션 컴포넌트를 통해 선택한 주문 기간 내 주문 내역을 페이지 별로 조회할 수 있다.
- **`도매상`** **회원의 주문 내역**
    - 약국들의 약품 주문 목록을 조회할 수 있고, 개별 건 선택 시 하단에서 주문 상세 내역을 조회할 수 있다.
    - 날짜 컴포넌트를 통해 주문 내역 조회 기간을 변경해서 조회할 수 있다.
    - 페이지네이션 컴포넌트를 통해 선택한 주문 기간 내 주문 내역을 페이지 별로 조회할 수 있다.

> **[페이지] 주문 예상 품목**
- 회원 분류가 **`도매상`** 인 사용자만이 이용할 수 있다.
- **주문 예상 품목**
    - 약국 회원들이 주문할 것으로 예상되는 약품 정보를 리스트 형태로 나타낸다.
    - 품목, 수량, 가격 총합, 예상 주문 일자를 렌더링한다.
- **주문 예상 약국**
    - 주문 예상 품목 컴포넌트에서 선택한 약품에 대해 주문이 예상되는 약국 정보를 리스트 형태로 나타낸다.
    - 약국명, 주문 수량, 주문 확률을 렌더링한다.
<br/><br/>
 
## 유저 플로우 차트

<img width="3357" height="2478" alt="image" src="https://github.com/user-attachments/assets/f7f10c94-44a6-42cc-864f-da1a510d51a0" />
<br/><br/>

## 추진일정

- **1주차 (10/13 ~ 17)**
    - 프로젝트 파악 및 유저 플로우 구체화
    - Figma 디자인 시안 제작
    - 프로젝트 기술 스택 결정 및 개발 환경 세팅
    - 플랫폼 퍼블리싱 작업 시작
    - 프로젝트 배포 자료 조사 & 배포 시행
- **2주차 (10/20 ~ 24)**
    - 디자인 시안 수정 작업
    - 플랫폼 퍼블리싱 작업 마무리
    - API 연동 작업 시작
- **3주차 (10/27 ~ 31)**
    - API 명세에 따른 퍼블리싱 수정 작업
    - API 연동 작업 진행
- **4주차 (11/3 ~ 7)**
    - API 연동 작업 마무리
    - Lighthouse을 통한 성능 개선
    - 실제 예측 데이터 연동 및 테스트
    - 누락된 기능 구현
    - 개발 문서 작성
<br/><br/>

## Environments
<img src="https://img.shields.io/badge/react.js-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">


