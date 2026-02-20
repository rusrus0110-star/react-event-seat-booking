import EventBooking from "./components/eventBooking";
import BookingProvider from "./context/eventContext";
import "./index.css";

function App() {
  return (
    <BookingProvider>
      <EventBooking />
    </BookingProvider>
  );
}

export default App;
