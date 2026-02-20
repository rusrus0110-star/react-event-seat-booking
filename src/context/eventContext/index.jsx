import { createContext, useState } from "react";
import eventsData from "../../data/eventsData";

const BookingContext = createContext(null);

const isSameDate = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const BookingProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const currentEvents = selectedDate
    ? eventsData.find((item) => isSameDate(item.date, selectedDate))?.events ||
      []
    : [];

  const handleSeatsChange = (updatedSeats) => {
    setSelectedEvent((prevEvent) => {
      if (!prevEvent) return prevEvent;

      return {
        ...prevEvent,
        seats: updatedSeats,
      };
    });
  };

  const value = {
    selectedDate,
    setSelectedDate,
    selectedEvent,
    setSelectedEvent,
    currentEvents,
    handleSeatsChange,
    availableDates: eventsData.map((item) => item.date),
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingProvider;
