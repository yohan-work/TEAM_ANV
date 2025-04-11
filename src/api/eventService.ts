import { CalendarEvent, TeamMember } from "../types";
import { mockEvents, mockTeamMembers, mockTeams } from "./mockData";
import { v4 as uuidv4 } from "uuid";

// In a real application, these would be API calls
// For this MVP, we're using in-memory storage

let events = [...mockEvents];
let members = [...mockTeamMembers];

// Event APIs
export const getEvents = (): Promise<CalendarEvent[]> => {
  return Promise.resolve(events);
};

export const getEventById = (id: string): Promise<CalendarEvent | null> => {
  const event = events.find((e) => e.id === id) || null;
  return Promise.resolve(event);
};

export const addEvent = (
  event: Omit<CalendarEvent, "id">
): Promise<CalendarEvent> => {
  const newEvent = {
    ...event,
    id: uuidv4(),
  };
  events = [...events, newEvent];
  return Promise.resolve(newEvent);
};

export const updateEvent = (event: CalendarEvent): Promise<CalendarEvent> => {
  events = events.map((e) => (e.id === event.id ? event : e));
  return Promise.resolve(event);
};

export const deleteEvent = (id: string): Promise<boolean> => {
  const initialLength = events.length;
  events = events.filter((e) => e.id !== id);
  return Promise.resolve(events.length < initialLength);
};

// Team Member APIs
export const getTeamMembers = (): Promise<TeamMember[]> => {
  return Promise.resolve(members);
};

export const getTeamMemberById = (id: string): Promise<TeamMember | null> => {
  const member = members.find((m) => m.id === id) || null;
  return Promise.resolve(member);
};

export const addTeamMember = (
  member: Omit<TeamMember, "id">
): Promise<TeamMember> => {
  const newMember = {
    ...member,
    id: uuidv4(),
  };
  members = [...members, newMember];
  return Promise.resolve(newMember);
};

export const updateTeamMember = (member: TeamMember): Promise<TeamMember> => {
  members = members.map((m) => (m.id === member.id ? member : m));
  return Promise.resolve(member);
};

export const deleteTeamMember = (id: string): Promise<boolean> => {
  const initialLength = members.length;
  members = members.filter((m) => m.id !== id);
  return Promise.resolve(members.length < initialLength);
};

// Notification API
export const sendSlackNotification = (
  message: string,
  users: string[]
): Promise<boolean> => {
  // In a real app, this would connect to Slack API
  console.log("Slack notification:", { message, users });
  return Promise.resolve(true);
};
