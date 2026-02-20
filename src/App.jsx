import EventBooking from "./components/eventBooking";
import BookingProvider from "./components/eventContext";
import "./index.css";

function App() {
  return (
    <BookingProvider>
      <EventBooking />
    </BookingProvider>
  );
}

export default App;
