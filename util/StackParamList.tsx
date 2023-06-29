import { BookingInfo } from '../screens/Booking/BookingScreen';

export type LoggedStackParamList = {
  Drawer: undefined;
  RestaurantDetailsScreen: { restaurantId: string };
  BookingPage: { restaurantId: string };
  BookingsScreen: undefined;
  BookingConfirmation: { bookingInfo: BookingInfo };
  VideoPresentation: { restaurantId?: string};
  RestaurantsScreen: undefined;
  UserDetailsScreen: undefined;
  UpsertReviewScreen: { reviewId: string };
  ReviewsScreen: { restaurantId: string };
  ReviewDetailsScreen: { reviewId: string };
};

export type UnloggedStackParamList = {
  Login: undefined;
  Signup: undefined;
}
