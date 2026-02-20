import { useEffect } from "react";
import styles from "./style.module.css";

const BookingModal = ({ isOpen, onClose, bookingDetails }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { eventTitle, seats, totalPrice, date } = bookingDetails;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.successIcon}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" fill="url(#successGradient)" />
            <path
              d="M25 40L35 50L55 30"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="successGradient"
                x1="0"
                y1="0"
                x2="80"
                y2="80"
              >
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className={styles.title}>Booking Confirmed!</h2>
        <p className={styles.message}>
          Thank you for your reservation. Your seats have been successfully
          booked.
        </p>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Event:</span>
            <span className={styles.detailValue}>{eventTitle}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Date:</span>
            <span className={styles.detailValue}>
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Seats:</span>
            <span className={styles.detailValue}>{seats.join(", ")}</span>
          </div>

          <div className={`${styles.detailRow} ${styles.total}`}>
            <span className={styles.detailLabel}>Total Amount:</span>
            <span className={styles.detailValue}>${totalPrice}</span>
          </div>
        </div>

        <div className={styles.ticketPreview}>
          <div className={styles.ticketHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Booking confirmation has been sent to your email</span>
          </div>
        </div>

        <button className={styles.confirmButton} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M6 10L9 13L14 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Done
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
