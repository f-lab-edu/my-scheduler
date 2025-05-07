# my-scheduler
배포링크: https://mymy-scheduler.vercel.app/

<img width="561" alt="Screenshot 2025-03-18 at 1 14 18 AM" src="https://github.com/user-attachments/assets/18a7cc17-09b2-4098-b3ce-8a8e90d69844" />

### 프로젝트 제목 & 설명
- 프로젝트명: my scheduler
- 설명: 기존 [JS 프로젝트](https://github.com/f-lab-edu/Scheduler)를 Next.js를 활용하여 마이그레이션 하는 프로젝트입니다.

### 사용 기술
- 프론트엔드: Next.js, Tailwind CSS
- 백엔드 인프라: Firebase
  

### 프로젝트 목표
- Vanilla JavaScript → Next.js 전환 경험
  - 기존에 순수 JavaScript로 구현했던 기능들을 Next.js 프레임워크로 재구성하며, 프레임워크 도입이 가져오는 구조적 이점과 개발 생산성 향상, 코드 유지보수성의 차별점을 명확히 이해하고 체득
- Next.js 최신 기능 학습 및 실전 적용
  - Next.js 15 기준으로 업데이트된 라우팅, 서버 컴포넌트(Server Components), API Routes, 이미지 최적화(Image Optimization) 등 핵심 기능을 직접 구현해 보며 각 기능의 동작 원리와 최적화

### 주요 기능
- 사용자가 등록한 스케줄을 보더와 캘린더를 통해 관리 및 확인이 가능
- 등록한 스케줄을 우선순위와 상태에(예정,진행,완료 외 설정한 값) 따라 필터링 및 검색 기능
- drag & drop과 같은 동작을 통해 보다 유연한 사용자 경험을 제공
- 로그인을 통해 사용자들이 함께 일정을 공유할 수 있는 기능 제공
  - 사용자 email 초대 -> 초대받은 링크로 진입하여 로그인을 통해 자동 수락되는 시스템 -> 마이페이지에 초대받은 팀 표시 -> 팀 스케줄 관리


### 폴더구조
- 특정 라우트에서만 사용되는 컴포넌트를 묶고 공통 컴포넌트는 components의 common으로 분리
