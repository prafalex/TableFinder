import React from 'react';
import { RouteProp } from '@react-navigation/native';
import Booking from '../../components/Booking';
import { LoggedStackParamList } from '../../util/StackParamList';


type BookingConfirmationScreenRouteProp = RouteProp<LoggedStackParamList, 'BookingConfirmation'>;

interface BookingConfirmationScreenProps {
  route: BookingConfirmationScreenRouteProp;
}

const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({ route }) => {
  const bookingInfo = route.params.bookingInfo;

  return <Booking {...bookingInfo}></Booking>;
};

export default BookingConfirmationScreen;
