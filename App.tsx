import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,AppRegistry } from "react-native";
import SignupScreen from "./screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen.js";
import AuthContextProvider, { AuthContext } from "./context/auth-context";
import { useContext, useEffect, useState } from "react";
import { Colours } from "./variables/colours.js";
import MyButton from "./components/utils/MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import RestaurantsScreen from './screens/RestaurantsScreen';
import RestaurantDetailsScreen from "./screens/RestaurantDetailsScreen";
import BookingScreen from './screens/BookingScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import VideoPresentationScreen from "./screens/VideoPresentationScreen";
import { Provider } from 'react-redux';
import {store} from './redux/storeRedux';


const Stack = createNativeStackNavigator();

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
  const authContext = useContext(AuthContext);

  const renderHeaderRight = ({
    tintColor,
  }: {
    tintColor: string;
  }): JSX.Element => (
    <MyButton
      icon="exit"
      color={tintColor}
      size={24}
      onPress={authContext.logout}
    />
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colours.backgroundColor },
      }}
    >
      <Stack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          headerRight: renderHeaderRight as any,
        }}
      />
      <Stack.Screen
        name="RestaurantDetailsScreen"
        component={RestaurantDetailsScreen}
        options={{
          headerRight: renderHeaderRight as any,
        }}
      />
      <Stack.Screen
        name="BookingPage"
        component={BookingScreen}
        options={{
          headerRight: renderHeaderRight as any,
        }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{ title: 'Booking Confirmation',headerLeft: () => null }}
      />
      <Stack.Screen
        name="VideoPresentation"
        component={VideoPresentationScreen}
        options={{ title: 'Video presentation' }}
      />
    </Stack.Navigator>
  );
}

function Nav() {
  const authContext = useContext(AuthContext);

  return (
    <Provider store={store}> 
    <NavigationContainer>
      {!authContext.auth && <AuthStack />}
      {authContext.auth && 
      <LoggedStack />
      }
    </NavigationContainer>
    </Provider>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(()=>{
    async function getToken(){
        const storedToken = await AsyncStorage.getItem('token');
        const storedEmail = await AsyncStorage.getItem('email');
        if(storedToken){
            authContext.authenticate(storedToken ?? '',storedEmail ?? '');
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
