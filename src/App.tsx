import { useEffect, useState, useCallback } from "react";
import Calendar from "./components/calendar/Calendar";
import EventModal from "./components/calendar/EventModal";
import EventDetail from "./components/calendar/EventDetail";
import Header from "./components/ui/Header";
import { CalendarEvent } from "./types";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "./api/eventService";
import useNotification from "./hooks/useNotification";
import { isSameDayAndMonth } from "./utils/dateUtils";

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { showNotification, requestPermission } = useNotification();

  // Load events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        console.log("Loading events...");
        const loadedEvents = await getEvents();
        console.log("Loaded events:", loadedEvents);
        setEvents(loadedEvents);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    loadEvents();
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  // Check for today's events and show notifications
  useEffect(() => {
    const today = new Date();
    const todayEvents = events.filter(
      (event) => isSameDayAndMonth(event.start, today) && event.slackNotify
    );

    todayEvents.forEach((event) => {
      showNotification({
        title: event.title,
        body: event.description || "오늘의 일정입니다.",
      });
    });
  }, [events, showNotification]);

  // Event handlers
  const handleEventSelect = useCallback((event: CalendarEvent) => {
    console.log("Event selected:", event);
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  }, []);

  const handleSlotSelect = useCallback((slotInfo: { start: Date }) => {
    console.log("Slot selected:", slotInfo);
    setSelectedDate(slotInfo.start);
    setIsAddModalOpen(true);
  }, []);

  const handleAddEvent = useCallback(
    async (newEvent: Omit<CalendarEvent, "id"> & { id?: string }) => {
      try {
        if (newEvent.id) {
          // If the event has an ID, it's an update
          const updatedEvent = newEvent as CalendarEvent;
          await updateEvent(updatedEvent);
          setEvents((prev) =>
            prev.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            )
          );
        } else {
          // If no ID, it's a new event
          const createdEvent = await addEvent(newEvent);
          setEvents((prev) => [...prev, createdEvent]);
        }
      } catch (error) {
        console.error("Error handling event:", error);
      }
    },
    []
  );

  const handleUpdateEvent = useCallback(
    (updatedEvent: Omit<CalendarEvent, "id"> & { id?: string }) => {
      // The combined handler will handle both add and update
      handleAddEvent(updatedEvent);
    },
    [handleAddEvent]
  );

  const handleDeleteEvent = useCallback(async () => {
    if (!selectedEvent) return;

    try {
      await deleteEvent(selectedEvent.id);
      setEvents((prev) =>
        prev.filter((event) => event.id !== selectedEvent.id)
      );
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }, [selectedEvent]);

  const handleAddEventClick = useCallback(() => {
    console.log("Add event button clicked");
    setSelectedDate(new Date());
    console.log("Setting isAddModalOpen to true");
    setIsAddModalOpen(true);
    console.log("isAddModalOpen should now be true");

    // Force re-render to make sure the state change is reflected
    setTimeout(() => {
      console.log("After timeout - isAddModalOpen should be:", true);
    }, 100);
  }, []);

  const handleEditClick = useCallback(() => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      <Header onAddEventClick={handleAddEventClick} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">CHOI CALENDAR</h1>
          <p className="text-gray-500">just for fun!</p>
        </div>

        <Calendar
          events={events}
          onSelectEvent={handleEventSelect}
          onSelectSlot={handleSlotSelect}
        />
      </main>

      {/* Add/Edit Event Modal */}
      <EventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEvent}
        selectedDate={selectedDate || undefined}
      />

      {/* Edit Event Modal */}
      <EventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateEvent}
        event={selectedEvent || undefined}
      />

      {/* Event Detail Modal */}
      <EventDetail
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedEvent}
        onEdit={handleEditClick}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}

export default App;
