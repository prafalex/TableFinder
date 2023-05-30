import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignupScreen from "./screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen.js";
import Restaurants from "./screens/Restaurants.js";
import AuthContextProvider, { AuthContext } from "./context/auth-context";
import { useContext, useEffect, useState } from "react";
import { Colours } from "./variables/colours.js";
import MyButton from "./components/utils/MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import RestaurantDetailsScreen from "./screens/RestaurantDetailsScreen";

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
    </Stack.Navigator>
  );
}

function Nav() {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authContext.auth && <AuthStack />}
      {authContext.auth && <LoggedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(()=>{
    async function getToken(){
        const storedToken = await AsyncStorage.getItem('token');
        //console.log("getting token: " + storedToken);
        if(storedToken){
            authContext.authenticate(storedToken);
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
