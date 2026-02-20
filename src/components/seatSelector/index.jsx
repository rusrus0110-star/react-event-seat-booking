import { useEffect, useState } from "react";
import BookingModal from "../bookingModal";
import styles from "./style.module.css";

const SeatSelector = ({ event, onSeatsChange, selectedDate }) => {
  const [seats, setSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (event) {
      // Load seats from sessionStorage
      const storageKey = `event_${event.id}_seats`;
      const savedSeats = sessionStorage.getItem(storageKey);

      if (savedSeats) {
        setSeats(JSON.parse(savedSeats));
      } else {
        setSeats(event.seats);
      }
    }
  }, [event]);

  const handleSeatToggle = (seatId) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat,
    );

    setSeats(updatedSeats);

    // Save to sessionStorage
    const storageKey = `event_${event.id}_seats`;
    sessionStorage.setItem(storageKey, JSON.stringify(updatedSeats));

    // Notify parent
    if (onSeatsChange) {
      onSeatsChange(updatedSeats);
    }
  };

  const handleConfirmBooking = () => {
    const selectedSeats = seats.filter((seat) => seat.isSelected);
    const totalPrice = selectedSeats.length * event.price;

    setBookingDetails({
      eventTitle: event.title,
      seats: selectedSeats.map((s) => s.label),
      totalPrice: totalPrice,
      date: selectedDate,
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!event) {
    return (
      <div className={styles.noSelection}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect
            x="8"
            y="20"
            width="48"
            height="32"
            rx="4"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <path
            d="M16 28H24M16 36H24M32 28H40M32 36H40M48 28H52M48 36H52"
            stroke="#e5e7eb"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <h3>No event selected</h3>
        <p>Please select an event to view available seats</p>
      </div>
    );
  }

  const selectedSeats = seats.filter((seat) => seat.isSelected);
  const totalPrice = selectedSeats.length * event.price;

  return (
    <>
      <div className={styles.seatSelector}>
        <div className={styles.header}>
          <h2 className={styles.title}>Select Your Seats</h2>
          <div className={styles.eventBadge}>{event.title}</div>
        </div>

        <div className={styles.seatsContainer}>
          <div className={styles.stage}>
            <svg width="100%" height="40" viewBox="0 0 300 40" fill="none">
              <path
                d="M0 20C0 20 75 0 150 0C225 0 300 20 300 20"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="150"
                y="30"
                textAnchor="middle"
                fill="#6366f1"
                fontSize="12"
                fontWeight="600"
              >
                STAGE
              </text>
            </svg>
          </div>

          <div className={styles.seatsGrid}>
            {seats.map((seat) => (
              <button
                key={seat.id}
                className={`${styles.seat} ${seat.isSelected ? styles.selected : ""}`}
                onClick={() => handleSeatToggle(seat.id)}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect
                    x="8"
                    y="12"
                    width="24"
                    height="20"
                    rx="3"
                    fill="currentColor"
                  />
                  <rect
                    x="6"
                    y="28"
                    width="28"
                    height="8"
                    rx="2"
                    fill="currentColor"
                  />
                  <circle cx="10" cy="15" r="2" fill="white" opacity="0.3" />
                </svg>
                <span className={styles.seatLabel}>{seat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendSeat} ${styles.available}`}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect
                  x="8"
                  y="12"
                  width="24"
                  height="20"
                  rx="3"
                  fill="currentColor"
                />
                <rect
                  x="6"
                  y="28"
                  width="28"
                  height="8"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span>Available</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendSeat} ${styles.selected}`}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect
                  x="8"
                  y="12"
                  width="24"
                  height="20"
                  rx="3"
                  fill="currentColor"
                />
                <rect
                  x="6"
                  y="28"
                  width="28"
                  height="8"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span>Selected</span>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h3>Booking Summary</h3>
            </div>
            <div className={styles.summaryContent}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Selected seats:</span>
                <span className={styles.summaryValue}>
                  {selectedSeats.map((s) => s.label).join(", ")}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Quantity:</span>
                <span className={styles.summaryValue}>
                  {selectedSeats.length} seats
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Price per seat:</span>
                <span className={styles.summaryValue}>${event.price}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span className={styles.summaryLabel}>Total:</span>
                <span className={styles.summaryValue}>${totalPrice}</span>
              </div>
            </div>
            <button
              className={styles.bookButton}
              onClick={handleConfirmBooking}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M16.6667 5L7.50004 14.1667L3.33337 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Confirm Booking
            </button>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        bookingDetails={bookingDetails}
      />
    </>
  );
};

export default SeatSelector;
