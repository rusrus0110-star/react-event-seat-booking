import { useState, useEffect } from "react";
import DateSelector from "../dateSelector";
import EventDetails from "../eventDetails";
import SeatSelector from "../seatSelector";
import eventsData from "../../data/eventsData";
import styles from "./style.module.css";

const EventBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const dateData = eventsData.find((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getDate() === selectedDate.getDate() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
        );
      });

      if (dateData) {
        setCurrentEvents(dateData.events);
        setSelectedEvent(null);
      } else {
        setCurrentEvents([]);
        setSelectedEvent(null);
      }
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleSeatsChange = (updatedSeats) => {
    setSelectedEvent((prev) => ({
      ...prev,
      seats: updatedSeats,
    }));

    setCurrentEvents((prev) =>
      prev.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, seats: updatedSeats }
          : event,
      ),
    );
  };

  const availableDates = eventsData.map((item) => item.date);

  return (
    <div className={styles.eventBooking}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="url(#gradient)" />
              <path d="M20 10L12 16L20 22L28 16L20 10Z" fill="white" />
              <path d="M12 24L20 30L28 24" fill="white" opacity="0.7" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <h1>EventBooker</h1>
              <p>Book your perfect experience</p>
            </div>
          </div>

          {selectedDate && (
            <div className={styles.selectedDateBadge}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect
                  x="3"
                  y="4"
                  width="14"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M7 2V6M13 2V6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.dateSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.stepBadge}>Step 1</div>
              <h2>Select a Date</h2>
              <p>Choose from available event dates</p>
            </div>
            <DateSelector
              availableDates={availableDates}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </section>

          {selectedDate && (
            <section className={styles.eventSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.stepBadge}>Step 2</div>
                <h2>Choose Your Event</h2>
                <p>
                  Select from {currentEvents.length} available{" "}
                  {currentEvents.length === 1 ? "event" : "events"}
                </p>
              </div>
              <EventDetails
                events={currentEvents}
                selectedEvent={selectedEvent}
                onEventSelect={handleEventSelect}
              />
            </section>
          )}

          {selectedEvent && (
            <section className={styles.seatSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.stepBadge}>Step 3</div>
                <h2>Pick Your Seats</h2>
                <p>Select your preferred seating</p>
              </div>
              <SeatSelector
                event={selectedEvent}
                onSeatsChange={handleSeatsChange}
                selectedDate={selectedDate}
              />
            </section>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 EventBooker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EventBooking;
