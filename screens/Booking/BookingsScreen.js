import { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getAllBookings } from '../../util/http';
import Booking from '../../components/Booking';
import { BookingContext } from '../../context/booking-context';
import { AuthContext } from '../../context/auth-context';
import ErrorOverlay from "../../components/utils/ErrorOverlay";

function BookingsScreen({ navigation }) {
  function renderBooking(itemData) {
    const item = itemData.item;
    const bookingProps = {
      restaurantId: item.restaurant_id,
      people: item.people,
      date: item.date,
      time: item.time,
    };
    return <Booking {...bookingProps} />;
  }

  const bookingContext = useContext(BookingContext);
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
      const bookings = await getAllBookings();
      bookingContext.getBookings(bookings);
      } catch (error) {
        setError('Could not get bookings!');
      }
    };

    fetchData();
  }, []);

  if(error) {
    return <ErrorOverlay message={error}/>
  }
  const filteredBookings = bookingContext.getBookingsByUser(authContext.email);

  return (
    <FlatList
      data={filteredBookings}
      keyExtractor={item => item.id}
      renderItem={renderBooking}
    />
  );
}

export default BookingsScreen;
