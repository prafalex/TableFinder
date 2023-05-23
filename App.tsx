import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from './screens/SignupScreen';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen.js';
import AuthContextProvider, { AuthContext } from './context/auth-context';
import {useContext} from 'react';
import {Colours} from './variables/colours.js';
import MyButton from './components/utils/MyButton';
const Stack = createNativeStackNavigator();


function AuthStack(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colours.backgroundColor },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function LoggedStack(){
  const authContext = useContext(AuthContext);
  return(
  <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colours.primaryColor },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colours.backgroundColor },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{
        headerRight: ({tintColor}) => (<MyButton icon="exit" color={tintColor} size={24} onPress={authContext.logout} />)
      }}/>
    </Stack.Navigator>
  )
}

function Nav(){
  const authContext = useContext(AuthContext);

  return (
      <NavigationContainer>
        {!authContext.auth && <AuthStack />}
        {authContext.auth && <LoggedStack/>}
      </NavigationContainer>
  );
}
export default function App() {
 return( <>
    <StatusBar style="light" />

    <AuthContextProvider>
      <Nav/>
    </AuthContextProvider>
  </>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


