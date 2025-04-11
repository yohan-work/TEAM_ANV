import { CalendarEvent, Team, TeamMember } from "../types";
import { addDays } from "date-fns";

// Mock team members
export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Choi",
    birthday: new Date(1990, 2, 15), // March 15, 1990
    joinDate: new Date(2020, 5, 1), // June 1, 2020
    position: "프론트엔드 개발자",
    team: "개발팀",
    slackUsername: "hyunwoo.kim",
  },
  {
    id: "2",
    name: "Choi2",
    birthday: new Date(1992, 7, 23), // August 23, 1992
    joinDate: new Date(2021, 0, 10), // January 10, 2021
    position: "백엔드 개발자",
    team: "개발팀",
    slackUsername: "minji.park",
  },
  {
    id: "3",
    name: "Choi3",
    birthday: new Date(1988, 10, 7), // November 7, 1988
    joinDate: new Date(2019, 3, 15), // April 15, 2019
    position: "제품 디자이너",
    team: "디자인팀",
    slackUsername: "seunghyun.lee",
  },
  {
    id: "4",
    name: "Choi17",
    birthday: new Date(1995, 5, 12), // June 12, 1995
    joinDate: new Date(2022, 1, 1), // February 1, 2022
    position: "UI/UX 디자이너",
    team: "디자인팀",
    slackUsername: "jiwoo.choi",
  },
  {
    id: "5",
    name: "Choi18",
    birthday: new Date(1991, 8, 30), // September 30, 1991
    joinDate: new Date(2021, 6, 5), // July 5, 2021
    position: "제품 관리자",
    team: "기획팀",
    slackUsername: "dain.jung",
  },
];

// Mock teams
export const mockTeams: Team[] = [
  {
    id: "1",
    name: "개발팀",
    members: mockTeamMembers.filter((member) => member.team === "개발팀"),
  },
  {
    id: "2",
    name: "디자인팀",
    members: mockTeamMembers.filter((member) => member.team === "디자인팀"),
  },
  {
    id: "3",
    name: "기획팀",
    members: mockTeamMembers.filter((member) => member.team === "기획팀"),
  },
];

// Helper function to create birthday events
const createBirthdayEvents = (members: TeamMember[]): CalendarEvent[] => {
  console.log("Creating birthday events");
  return members
    .map((member) => {
      if (!member.birthday) return null;

      // 2025년으로 고정
      const birthdayThisYear = new Date(
        2025,
        member.birthday.getMonth(),
        member.birthday.getDate()
      );

      console.log(
        `Birthday event for ${member.name}: ${birthdayThisYear.toISOString()}`
      );

      return {
        id: `birthday-${member.id}`,
        title: `${member.name} 생일`,
        start: birthdayThisYear,
        end: birthdayThisYear,
        type: "birthday",
        team: member.team,
        description: `${member.name}님의 생일입니다! 축하해주세요.`,
        slackNotify: true,
      };
    })
    .filter(Boolean) as CalendarEvent[];
};

// Helper function to create anniversary events
const createAnniversaryEvents = (members: TeamMember[]): CalendarEvent[] => {
  console.log("Creating anniversary events");
  return members
    .map((member) => {
      if (!member.joinDate) return null;

      // 2025년으로 고정
      const joinAnniversaryThisYear = new Date(
        2025,
        member.joinDate.getMonth(),
        member.joinDate.getDate()
      );

      const yearsAtCompany = 2025 - member.joinDate.getFullYear();

      console.log(
        `Anniversary event for ${
          member.name
        }: ${joinAnniversaryThisYear.toISOString()}`
      );

      return {
        id: `anniversary-${member.id}`,
        title: `${member.name} 입사 ${yearsAtCompany}주년`,
        start: joinAnniversaryThisYear,
        end: joinAnniversaryThisYear,
        type: "anniversary",
        team: member.team,
        description: `${member.name}님의 입사 ${yearsAtCompany}주년입니다!`,
        slackNotify: true,
      };
    })
    .filter(Boolean) as CalendarEvent[];
};

// Mock custom events
export const mockCustomEvents: CalendarEvent[] = [
  {
    id: "custom-1",
    title: "개발팀 프로젝트 런칭",
    start: new Date(2025, 3, 8), // 2025년 4월 8일
    end: new Date(2025, 3, 8),
    type: "custom",
    team: "개발팀",
    description: "신규 프로젝트 런칭 기념일",
    slackNotify: true,
  },
  {
    id: "custom-2",
    title: "회사 창립일",
    start: new Date(2025, 3, 15), // 2025년 4월 15일
    end: new Date(2025, 3, 15),
    type: "custom",
    description: "회사 창립 기념일",
    slackNotify: true,
  },
  {
    id: "custom-3",
    title: "디자인팀 워크숍",
    start: new Date(2025, 3, 14), // 2025년 4월 14일
    end: new Date(2025, 3, 14),
    type: "custom",
    team: "디자인팀",
    description: "디자인팀 반기 워크숍",
    slackNotify: false,
  },
];

// Combine all events
export const mockEvents: CalendarEvent[] = [
  ...createBirthdayEvents(mockTeamMembers),
  ...createAnniversaryEvents(mockTeamMembers),
  ...mockCustomEvents,
];
