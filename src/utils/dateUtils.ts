import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  addYears,
} from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (
  date: Date,
  formatStr: string = "yyyy년 MM월 dd일"
): string => {
  return format(date, formatStr, { locale: ko });
};

export const getBirthdayThisYear = (birthday: Date): Date => {
  const today = new Date();
  const birthdayThisYear = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );

  // If the birthday has already occurred this year, return next year's date
  if (birthdayThisYear < today) {
    return addYears(birthdayThisYear, 1);
  }

  return birthdayThisYear;
};

export const getDateRange = (
  date: Date,
  view: "month" | "week" | "day"
): { start: Date; end: Date } => {
  switch (view) {
    case "month":
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    case "week":
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }), // 1 means Monday
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    case "day":
      return {
        start: startOfDay(date),
        end: endOfDay(date),
      };
    default:
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
  }
};

export const isSameDayAndMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth()
  );
};
