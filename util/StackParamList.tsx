import { BookingInfo } from '../screens/Booking/BookingScreen';

export type LoggedStackParamList = {
  Drawer: undefined;
  RestaurantDetailsScreen: { restaurantId: string };
  BookingPage: { bookingId: string };
  BookingsScreen: undefined;
  BookingConfirmation: { bookingInfo: BookingInfo };
  VideoPresentation: undefined;
  RestaurantsScreen: undefined;
  UserDetailsScreen: undefined;
  UpsertReviewScreen: { reviewId: string };
  ReviewsScreen: { restaurantId: string };
};
