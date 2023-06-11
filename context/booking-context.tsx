import { createContext, useContext, useEffect, useState } from "react";

interface Booking {
  id: string;
  date:string;
  email: string;
  people:number;
  restaurantId:string;
  time:string;
}

interface BookingContextValue {
  bookings: Booking[];
  getBookings: (bookings: Booking[]) => void;
  getBookingsByUser: (email: string) => Booking[];
  getBooking: (id: string) => Booking | undefined;
  addBooking: (booking: Booking) => void;
}

export const BookingContext = createContext<BookingContextValue>({
  bookings: [],
  getBookings: (bookings) => {},
  getBookingsByUser: (email) => [],
  getBooking: (id) => undefined,
  addBooking: (booking) => {},
});

function BookingContextProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  function getBookings(bookings: Booking[]) : void {
    setBookings(bookings);
  }

  function getBookingsByUser(email: string) : Booking[] {
    const filteredBookings : Booking[] = bookings.filter(
      (booking) => booking.email === email
    );

    return filteredBookings;
  }

  function getBooking(id: string) : Booking | undefined {
    const selectedBooking = bookings.find((booking) => booking.id === id);
    return selectedBooking;
  }

  function addBooking(booking: Booking) : void {
    setBookings((currentBookings) => [...currentBookings, booking]);
  }

  const value: BookingContextValue = {
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
