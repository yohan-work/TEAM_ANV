import React, { useState, useEffect } from "react";
import { CalendarEvent, EventType, Team } from "../../types";
import { format } from "date-fns";
import { mockTeams } from "../../api/mockData";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id"> & { id?: string }) => void;
  event?: CalendarEvent;
  selectedDate?: Date;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  selectedDate,
}) => {
  console.log("EventModal rendering with isOpen:", isOpen);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<EventType>("custom");
  const [team, setTeam] = useState<string>("");
  const [description, setDescription] = useState("");
  const [slackNotify, setSlackNotify] = useState(false);
  const [teams] = useState<Team[]>(mockTeams);

  useEffect(() => {
    console.log("EventModal isOpen changed to:", isOpen);
    if (event) {
      setTitle(event.title);
      setDate(format(event.start, "yyyy-MM-dd"));
      setType(event.type);
      setTeam(event.team || "");
      setDescription(event.description || "");
      setSlackNotify(event.slackNotify || false);
    } else if (selectedDate) {
      setDate(format(selectedDate, "yyyy-MM-dd"));
      setTitle("");
      setType("custom");
      setTeam("");
      setDescription("");
      setSlackNotify(false);
    }
  }, [event, selectedDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const eventData: Omit<CalendarEvent, "id"> = {
      title,
      start,
      end,
      type,
      team: team || undefined,
      description: description || undefined,
      slackNotify,
    };

    // If we're editing an existing event, include the id
    if (event?.id) {
      onSave({ ...eventData, id: event.id });
    } else {
      onSave(eventData);
    }

    onClose();
  };

  const eventTypeLabels: Record<EventType, string> = {
    birthday: "생일",
    anniversary: "기념일",
    custom: "커스텀 이벤트",
  };

  if (!isOpen) return null;

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
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 500,
            marginBottom: "1rem",
            color: "#111827",
          }}
        >
          {event ? "이벤트 수정" : "새 이벤트 추가"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.25rem",
                color: "#111827",
              }}
            >
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.25rem",
                color: "#111827",
              }}
            >
              날짜
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.25rem",
                color: "#111827",
              }}
            >
              이벤트 유형
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as EventType)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                outline: "none",
              }}
            >
              {Object.entries(eventTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.25rem",
                color: "#111827",
              }}
            >
              팀
            </label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                outline: "none",
              }}
            >
              <option value="">전체</option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.25rem",
                color: "#111827",
              }}
            >
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                outline: "none",
                minHeight: "5rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="slack-notify"
                checked={slackNotify}
                onChange={(e) => setSlackNotify(e.target.checked)}
                style={{ marginRight: "0.5rem" }}
              />
              <label
                htmlFor="slack-notify"
                style={{
                  fontSize: "0.875rem",
                  color: "#111827",
                }}
              >
                슬랙 알림 활성화
              </label>
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
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "#F3F4F6",
                color: "#111827",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              취소
            </button>
            <button
              type="submit"
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
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
