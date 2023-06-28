import { useContext, useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import { getAllBookings } from '../../util/http';
import Booking from '../../components/Booking';
import { BookingContext } from '../../context/booking-context';
import { AuthContext } from '../../context/auth-context';
import ErrorOverlay from "../../components/utils/ErrorOverlay";
import { LoggedStackParamList } from '../../util/StackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { Booking as BookingInterface } from '../../util/http'; // Import the BookingInfo interface

type BookingsScreenNavigationProp = StackNavigationProp<LoggedStackParamList, 'BookingsScreen'>;

interface BookingsScreenProps {
  navigation: BookingsScreenNavigationProp;
}

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation }) => {
  const bookingContext = useContext(BookingContext);
  const authContext = useContext(AuthContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
      const bookings: BookingInterface[] = await getAllBookings(); 
      bookingContext.getBookings(bookings);
      } catch (error) {
        setError('Could not get bookings!');
      }
    };

    fetchData();
  }, [bookingContext.bookings]);

  if(error) {
    return <ErrorOverlay message={error}/>
  }
  const filteredBookings = bookingContext.getBookingsByUser(authContext.email);

  const renderBooking = (itemData: { item: BookingInterface }) => { 
    const item = itemData.item;
    const bookingProps = {
      restaurantId: item.restaurantId,
      people: item.people,
      date: item.date,
      time: item.time,
    };
    return <Booking {...bookingProps} />;
  };

  return (
    <FlatList
      data={filteredBookings}
      keyExtractor={item => item.id}
      renderItem={renderBooking}
    />
  );
};

export default BookingsScreen;
