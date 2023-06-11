import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import SignupScreen from "./screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen.js";
import AuthContextProvider, { AuthContext } from "./context/auth-context";
import React, { useContext, useEffect, useState } from "react";
import { Colours } from "./variables/colours.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import RestaurantDetailsScreen from "./screens/RestaurantDetailsScreen";
import BookingScreen from "./screens/BookingScreen";
import BookingConfirmationScreen from "./screens/BookingConfirmationScreen";
import VideoPresentationScreen from "./screens/VideoPresentationScreen";
import UpsertReviewScreen from "./screens/UpsertReviewScreen";
import ReviewsScreen from "./screens/ReviewsScreen";
import { Provider } from "react-redux";
import { store } from "./redux/storeRedux";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import BookingsScreen from "./screens/BookingsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Icon } from "react-native-elements";
import RestaurantContextProvider from "./context/restaurant-context";
import BookingContextProvider from "./context/booking-context";
import ReviewContextProvider from "./context/review-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authContext = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: Colours.backgroundColor },
        drawerStyle: { backgroundColor: Colours.backgroundColor },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: Colours.primaryColor,
        drawerActiveBackgroundColor: Colours.secondaryColor,
      }}
      drawerContent={(props) => {
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
          title: "All restaurants",
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          title: "My bookings",
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          title: "My reviews",
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "My favorites",
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
        headerTintColor: "white",
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
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: "white",
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
      <Stack.Screen name="BookingPage" component={BookingScreen} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{ title: "Booking Confirmation", headerLeft: () => null }}
      />
      <Stack.Screen
        name="VideoPresentation"
        component={VideoPresentationScreen}
        options={{ title: "Video presentation" }}
      />

      <Stack.Screen
        name="UpsertReviewScreen"
        component={UpsertReviewScreen}
        options={{ title: "UpsertReview" }}
      />

      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{ title: "Reviews" }}
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
      const storedToken = await AsyncStorage.getItem("token");
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedToken) {
        authContext.authenticate(storedToken ?? "", storedEmail ?? "");
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
