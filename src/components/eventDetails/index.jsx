import styles from "./style.module.css";

const EventDetails = ({ events, selectedEvent, onEventSelect }) => {
  if (!events || events.length === 0) {
    return (
      <div className={styles.noEvents}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#e5e7eb" strokeWidth="3" />
          <path
            d="M32 20V34L40 38"
            stroke="#9ca3af"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <h3>No events available</h3>
        <p>Please select a different date</p>
      </div>
    );
  }

  return (
    <div className={styles.eventDetails}>
      <h2 className={styles.title}>Available Events</h2>
      <div className={styles.eventsList}>
        {events.map((event) => {
          const bookedSeats = event.seats.filter(
            (seat) => seat.isSelected,
          ).length;
          const totalSeats = event.seats.length;
          const availableSeats = totalSeats - bookedSeats;
          const isSelected = selectedEvent?.id === event.id;

          return (
            <div
              key={event.id}
              className={`${styles.eventCard} ${isSelected ? styles.selected : ""}`}
              onClick={() => onEventSelect(event)}
            >
              <div className={styles.eventHeader}>
                <div className={styles.eventIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.eventInfo}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDescription}>{event.description}</p>
                </div>
              </div>

              <div className={styles.eventMeta}>
                <div className={styles.metaItem}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9 4.5V9L12 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{event.time}</span>
                </div>

                <div className={styles.metaItem}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M15 7.5C15 12.75 9 16.5 9 16.5C9 16.5 3 12.75 3 7.5C3 4.18629 5.68629 1.5 9 1.5C12.3137 1.5 15 4.18629 15 7.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="9"
                      cy="7.5"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className={styles.eventFooter}>
                <div className={styles.priceTag}>
                  <span className={styles.priceLabel}>Price</span>
                  <span className={styles.priceValue}>${event.price}</span>
                </div>

                <div className={styles.seatsInfo}>
                  <span
                    className={`${styles.seatsBadge} ${availableSeats > 0 ? styles.available : styles.soldOut}`}
                  >
                    {availableSeats > 0
                      ? `${availableSeats} seats left`
                      : "Sold out"}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className={styles.selectedIndicator}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6667 5L7.50004 14.1667L3.33337 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventDetails;
