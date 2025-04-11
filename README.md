# TEAM ANNIVARSARY CALENDAR

JUST For Fun. That's for me :0

## Skill

- 팀원 생일 등록 및 관리
- 팀별 기념일 설정 (입사일, 프로젝트 런칭일 등)
- 월별/주별/일별 캘린더 보기
- 이벤트 추가/수정/삭제
- 브라우저 알림 지원
- Slack 알림 연동 지원 (모의 구현)

## 기술 스택

- React + TypeScript
- Vite
- Tailwind CSS
- date-fns (날짜 관리)
- react-big-calendar (캘린더 UI)
- headlessUI (모달 컴포넌트)

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

## 프로젝트 구조

```
src/
  ├── api/             # API 서비스
  ├── components/      # 컴포넌트
  │   ├── calendar/    # 캘린더 관련 컴포넌트
  │   └── ui/          # UI 컴포넌트
  ├── hooks/           # 커스텀 훅
  ├── types/           # 타입 정의
  └── utils/           # 유틸리티 함수
```

## 사용법

1. 캘린더에서 날짜를 클릭하여 새 이벤트를 추가할 수 있습니다.
2. 이벤트를 클릭하여 상세 정보를 확인하고 수정/삭제할 수 있습니다.
3. 우측 상단의 버튼으로 보기 모드(월간/주간/일간)를 전환할 수 있습니다.

## MVP 확장 계획

- 팀원 프로필 관리 기능
- 구글 캘린더 연동
- 모바일 반응형 개선
- 다크 모드 지원
- 국제화(i18n) 지원
