import React from "react";
import { CalendarEvent } from "../../types";
import { formatDate } from "../../utils/dateUtils";

interface EventDetailProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  onEdit: () => void;
  onDelete: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({
  isOpen,
  onClose,
  event,
  onEdit,
  onDelete,
}) => {
  console.log("EventDetail rendering with isOpen:", isOpen, "event:", event);

  if (!isOpen || !event) return null;

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "birthday":
        return "생일";
      case "anniversary":
        return "기념일";
      case "custom":
        return "커스텀 이벤트";
      default:
        return "이벤트";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "birthday":
        return "🎂";
      case "anniversary":
        return "🎉";
      case "custom":
        return "📝";
      default:
        return "📆";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "28rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
              {getEventIcon(event.type)}
            </span>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "#111827",
                margin: 0,
              }}
            >
              {event.title}
            </h3>
          </div>
          <span
            style={{
              padding: "0.25rem 0.5rem",
              fontSize: "0.75rem",
              backgroundColor: "#F4F5F7",
              borderRadius: "9999px",
            }}
          >
            {getEventTypeLabel(event.type)}
          </span>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "0.75rem" }}>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#6B7280",
                margin: "0 0 0.25rem 0",
              }}
            >
              날짜
            </p>
            <p style={{ margin: 0, color: "#111827" }}>
              {formatDate(event.start)}
            </p>
          </div>

          {event.team && (
            <div style={{ marginBottom: "0.75rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#6B7280",
                  margin: "0 0 0.25rem 0",
                }}
              >
                팀
              </p>
              <p style={{ margin: 0, color: "#111827" }}>{event.team}</p>
            </div>
          )}

          {event.description && (
            <div style={{ marginBottom: "0.75rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#6B7280",
                  margin: "0 0 0.25rem 0",
                }}
              >
                설명
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#111827",
                  whiteSpace: "pre-wrap",
                }}
              >
                {event.description}
              </p>
            </div>
          )}

          <div style={{ marginBottom: "0.75rem" }}>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#6B7280",
                margin: "0 0 0.25rem 0",
              }}
            >
              슬랙 알림
            </p>
            <p style={{ margin: 0, color: "#111827" }}>
              {event.slackNotify ? "활성화" : "비활성화"}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
          }}
        >
          <button
            type="button"
            onClick={onDelete}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              backgroundColor: "#EF4444",
              color: "white",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
          <button
            type="button"
            onClick={onEdit}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              backgroundColor: "#F4F5F7",
              color: "#111827",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            수정
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              backgroundColor: "#00C1DE",
              color: "white",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
