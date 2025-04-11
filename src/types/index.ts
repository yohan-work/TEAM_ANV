export type EventType = "birthday" | "anniversary" | "custom";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  team?: string;
  description?: string;
  slackNotify?: boolean;
  createdBy?: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  birthday?: Date;
  joinDate?: Date;
  position?: string;
  team?: string;
  slackUsername?: string;
}

export interface ViewMode {
  view: "month" | "week" | "day";
  date: Date;
}
