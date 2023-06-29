import { BookingInfo } from '../screens/Booking/BookingScreen';

export type AllStackParamList = {
  Login: undefined;
  Signup: undefined;
  Drawer: undefined;
  RestaurantDetailsScreen: { restaurantId: string };
  BookingPage: { restaurantId: string };
  BookingsScreen: undefined;
  BookingConfirmation: { bookingInfo: BookingInfo };
  VideoPresentation: { restaurantId?: string};
  RestaurantsScreen: undefined;
  UserDetailsScreen: undefined;
  UpsertReviewScreen: { reviewId: string,restaurantId?: string };
  ReviewsScreen: { restaurantId?: string };
  ReviewDetailsScreen: { reviewId: string };
};

