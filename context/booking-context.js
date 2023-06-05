import { createContext } from "react";
import { useContext, useEffect, useState } from "react";

export const BookingContext = createContext({
  bookings: [],
  getBookings: (bookings) => {},
  getBookingsByUser: (email) => {},
  getBooking: (id) => {},
  addBooking: (booking) => {},
});

function BookingContextProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  function getBookings(bookings) {
    setBookings(bookings);
  }

  function getBookingsByUser(email) {
    const filteredBookings = bookings.filter(
      (booking) => booking.email == email
    );

    return filteredBookings;
  }

  function getBooking(id) {
    const selectedBooking = bookings.find((booking) => booking.id === id);
    return selectedBooking;
  }

  function addBooking(booking) {
    setBookings((currentBookings) => [...currentBookings, booking]);
  }

  const value = {
    bookings: bookings,
    getBookings: getBookings,
    getBookingsByUser: getBookingsByUser,
    addBooking: addBooking,
    getBooking: getBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export default BookingContextProvider;
