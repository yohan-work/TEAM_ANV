# 팀 기념일 및 생일 캘린더

JUST For Fun!! That's for me :0

## 주요 기능

- 개인 생일 등록 및 관리
- 조직 별 기념일 설정 (입사일, 프로젝트 런칭일 등)
- 월별/주별/일별 캘린더 보기
- 이벤트 추가/수정/삭제
- 브라우저 알림 지원
- Slack 알림 연동 지원 (모의 구현)

## 기술 스택

### 프론트엔드

- **프레임워크**: React 19.0.0 + TypeScript
- **빌드 도구**: Vite 6.2.0
- **UI 라이브러리**:
  - react-big-calendar 1.18.0
  - inline style ::: 커스텀 UI 컴포넌트
- **날짜 관리**:
  - date-fns 4.1.0
  - moment 2.30.1 (캘린더 포맷팅)
- **유틸리티**:
  - uuid 11.1.0 (고유 ID 생성)
  - classnames 2.5.1 (조건부 클래스명 관리)

### 데이터 관리

- client side status
- 모킹 데이터 :: USE service layer
- based PROMISE API interface (back data 연동 준비)

## 프로젝트 구조

```
src/
  ├── api/             # API 서비스 및 모킹 데이터
  ├── components/      # 컴포넌트
  │   ├── calendar/    # 캘린더 관련 컴포넌트
  │   └── ui/          # UI 컴포넌트
  ├── hooks/           # 커스텀 훅 (알림 등)
  ├── types/           # 타입 정의
  └── utils/           # 유틸리티 함수 (날짜 등)
```

## 시작하기

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
npm run build
```
