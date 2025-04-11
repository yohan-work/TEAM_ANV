# CHOI CALENDAR

JUST For Fun!! That's for me :0

## stack

### FFF

- **framework**: React 19.0.0 + TypeScript
- **build tool**: Vite 6.2.0
- **UI library**:
  - react-big-calendar 1.18.0
  - inline style ::: 커스텀 UI 컴포넌트
- **DATE MANAGER**:
  - date-fns 4.1.0
  - moment 2.30.1 (캘린더 포맷팅)
- **Utility**:
  - uuid 11.1.0 (고유 ID 생성)
  - classnames 2.5.1 (조건부 클래스명 관리)

### DATA

- client side status
- Mocking DATA :: USE service layer
- based PROMISE API interface (back data 연동 준비)

## PROJECT STRUCTURE

```
src/
  ├── api/             # API service / mocking data
  ├── components/      # component
  │   ├── calendar/    # calendar component
  │   └── ui/          # UI component
  ├── hooks/           # custom hook(notification)
  ├── types/           # define type
  └── utils/           # function utility
```
