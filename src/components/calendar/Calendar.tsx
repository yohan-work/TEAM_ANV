import React, { useState, useCallback } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  SlotInfo,
  DateRange,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
// @ts-expect-error - No type definitions for moment/locale/ko
import "moment/locale/ko";
import { CalendarEvent, ViewMode } from "../../types";

// Set up the localizer
moment.locale("ko");
const localizer = momentLocalizer(moment);

interface CalendarProps {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectSlot: (slotInfo: SlotInfo) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  events,
  onSelectEvent,
  onSelectSlot,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>({
    view: "month",
    date: new Date(),
  });

  const handleNavigate = useCallback((newDate: Date) => {
    setViewMode((prev) => ({ ...prev, date: newDate }));
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setViewMode((prev) => ({ ...prev, view: view as ViewMode["view"] }));
  }, []);

  // Function to get custom event styles based on event type
  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "";
    let borderColor = "";

    switch (event.type) {
      case "birthday":
        backgroundColor = "#FFD6D6"; // Light pink
        borderColor = "#FF5D5D"; // Pink
        break;
      case "anniversary":
        backgroundColor = "#D6E7FF"; // Light blue
        borderColor = "#3B82F6"; // Blue
        break;
      case "custom":
        backgroundColor = "#D6F6E1"; // Light green
        borderColor = "#10B981"; // Green
        break;
      default:
        backgroundColor = "#F3F4F6"; // Light gray
        borderColor = "#9CA3AF"; // Gray
    }

    return {
      style: {
        backgroundColor,
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: "4px",
        color: "#1A1A1A",
        fontWeight: 500,
        padding: "2px 5px",
      },
    };
  };

  // Map view names to more user-friendly names
  const viewNames = {
    month: "월간",
    week: "주간",
    day: "일간",
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.125rem",
          }}
        >
          {moment(viewMode.date).format("YYYY년 M월")}
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          {Object.entries(viewNames).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleViewChange(key)}
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: viewMode.view === key ? "#00C1DE" : "#F4F5F7",
                color: viewMode.view === key ? "white" : "#1A1A1A",
                cursor: "pointer",
                border: "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => {
          console.log("Calendar onSelectEvent called with:", event);
          onSelectEvent(event);
        }}
        onSelectSlot={(slotInfo) => {
          console.log("Calendar onSelectSlot called with:", slotInfo);
          onSelectSlot(slotInfo);
        }}
        selectable
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        view={viewMode.view}
        date={viewMode.date}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        eventPropGetter={eventStyleGetter}
        formats={{
          dayFormat: "D",
          monthHeaderFormat: "YYYY년 M월",
          dayHeaderFormat: "M월 D일 dddd",
          dayRangeHeaderFormat: ({ start, end }: DateRange) =>
            `${moment(start).format("YYYY년 M월 D일")} - ${moment(end).format(
              "M월 D일"
            )}`,
        }}
        messages={{
          today: "오늘",
          previous: "이전",
          next: "다음",
          month: "월간",
          week: "주간",
          day: "일간",
          agenda: "일정",
          date: "날짜",
          time: "시간",
          event: "이벤트",
          noEventsInRange: "이 기간에 일정이 없습니다.",
        }}
        popup
      />
    </div>
  );
};

export default Calendar;
