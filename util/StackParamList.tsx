import { BookingInfo } from "../screens/Booking/BookingScreen";

export type LoggedStackParamList = {
  Drawer: undefined;
  RestaurantDetailsScreen: { restaurantId: string };
  BookingPage: { bookingId: string };
  BookingsScreen: undefined;
  BookingConfirmation: { bookingInfo: BookingInfo };  // Replace BookingInfo with the actual type of your booking info object
  VideoPresentation: undefined;
  RestaurantsScreen:undefined;
};
