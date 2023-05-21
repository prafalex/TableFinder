import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from './screens/SignupScreen';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();


function AuthStack(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


