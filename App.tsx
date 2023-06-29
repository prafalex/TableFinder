import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SignupScreen from './screens/User/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/User/LoginScreen';
import AuthContextProvider, { AuthContext } from './context/auth-context';
import React, { useContext, useEffect, useState } from 'react';
import { Colours } from './variables/colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import RestaurantsScreen from './screens/Restaurant/RestaurantsScreen';
import RestaurantDetailsScreen from './screens/Restaurant/RestaurantDetailsScreen';
import BookingScreen, {
  BookingScreenProps,
  BookingInfo,
} from './screens/Booking/BookingScreen';
import BookingConfirmationScreen from './screens/Booking/BookingConfirmationScreen';
import VideoPresentationScreen from './screens/Restaurant/VideoPresentationScreen';
import UpsertReviewScreen from './screens/Review/UpsertReviewScreen';
import ReviewsScreen from './screens/Review/ReviewsScreen';
import { Provider } from 'react-redux';
import { store } from './redux/storeRedux';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BookingsScreen from './screens/Booking/BookingsScreen';
import { Icon } from 'react-native-elements';
import RestaurantContextProvider from './context/restaurant-context';
import BookingContextProvider from './context/booking-context';
import ReviewContextProvider from './context/review-context';
import UserDetailsScreen from './screens/User/UserDetailsScreen';

type RootStackParamList = {
  Restaurants: undefined;
  Login: undefined;
  Signup: undefined;
  Drawer: undefined;
  RestaurantDetailsScreen: { restaurantId: string };
  BookingPage: { restaurantId: string };
  BookingConfirmation: { bookingInfo?: BookingInfo };
  VideoPresentation: undefined;
  Reviews: undefined;
  UpsertReviewScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authContext = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: Colours.backgroundColor },
        drawerStyle: { backgroundColor: Colours.primaryColor },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: Colours.primaryColor,
        drawerActiveBackgroundColor: Colours.secondaryColor,
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label=""
              icon={() => <Icon name="logout" size={24} color="white" />}
              onPress={authContext.logout}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          title: 'All restaurants',
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          title: 'My bookings',
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          title: 'My reviews',
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{
          title: 'My details',
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: Colours.textSecondaryColor,
        contentStyle: { backgroundColor: Colours.backgroundColor },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function LoggedStack() {
  return (
    <Stack.Navigator
      initialRouteName="Restaurants"
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: Colours.textSecondaryColor,
        contentStyle: { backgroundColor: Colours.backgroundColor },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RestaurantDetailsScreen"
        component={RestaurantDetailsScreen}
      />
      <Stack.Screen
        name="BookingPage"
        component={BookingScreen as React.ComponentType<BookingScreenProps>}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{ title: 'Booking Confirmation', headerLeft: () => null }}
      />
      <Stack.Screen
        name="VideoPresentation"
        component={VideoPresentationScreen}
        options={{ title: 'Video presentation' }}
      />

      <Stack.Screen
        name="UpsertReviewScreen"
        component={UpsertReviewScreen}
        options={{ title: 'UpsertReview' }}
      />

      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{ title: 'Reviews' }}
      />
    </Stack.Navigator>
  );
}

function Nav() {
  const authContext = useContext(AuthContext);

  return (
    <Provider store={store}>
      <ReviewContextProvider>
        <RestaurantContextProvider>
          <BookingContextProvider>
            <NavigationContainer>
              {!authContext.auth && <AuthStack />}
              {authContext.auth && <LoggedStack />}
            </NavigationContainer>
          </BookingContextProvider>
        </RestaurantContextProvider>
      </ReviewContextProvider>
    </Provider>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedToken) {
        authContext.authenticate(storedToken ?? '', storedEmail ?? '');
      }
      setIsLoading(false);
    }
    getToken();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return <Nav />;
}
export { RootStackParamList };
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202030',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
