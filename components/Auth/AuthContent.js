import { useState } from 'react';
import { Alert,StyleSheet,View,Text,Pressable } from 'react-native';
import UserForm from './UserForm';
import {useNavigation} from '@react-navigation/native'
import {Colours} from '../../variables/colours.js';


function AuthContent({ isLogin, onAuthenticate }) {

    const navigation = useNavigation();

    const [credentialsInvalid, setCredentialsInvalid] = useState({
      email: false,
      password: false,
      confirmPassword: false,
    });
 
  
    function switchAuthModeHandler() {
      if(isLogin){
        navigation.navigate('Signup');
      }
      else{
        navigation.navigate('Login');
      }
    }
  
    function submitHandler(credentials) {
      let { email, password, confirmPassword } = credentials;
  
      email = email.trim();
      password = password.trim();
  
      const emailIsValid = email.includes('@');
      const passwordIsValid = password.length > 6;
      const passwordsAreEqual = password === confirmPassword;
  
      if (
        !emailIsValid ||
        !passwordIsValid ||
        (!isLogin && !passwordsAreEqual))
      {
        Alert.alert('Invalid input', 'Please check your entered credentials.');
        setCredentialsInvalid({
          email: !emailIsValid,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }
      onAuthenticate({ email, password });
    }
  
    return (
        <> 
          <View style={styles.form}>
            <UserForm
              isLogin={isLogin}
              onSubmit={submitHandler}
              credentialsInvalid={credentialsInvalid}/>

            <View style={styles.button}>
                <Pressable  onPress={switchAuthModeHandler}>
                  <Text style={styles.textButton}>{isLogin ? 'Create a new user' : 'Log in instead'}</Text>
                </Pressable>
            </View>
          </View>
          
        </>
        
    );
  }
  
  export default AuthContent;
  
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      width: 200,
      height: 50,
      borderRadius: 7,
      backgroundColor: Colours.secondaryColor,
    },
    textButton: {
      alignSelf: 'center',
      paddingVertical:10,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    form:{
      alignItems: 'center',
      justifyContent: 'center',
    } 
  });