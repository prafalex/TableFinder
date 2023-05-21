import { useState } from 'react';
import { Alert,Button,StyleSheet } from 'react-native';
import UserForm from './UserForm';
import {useNavigation} from '@react-navigation/native'

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
        <UserForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}/>

          <Button style={styles.button}
            title={isLogin ? 'Create a new user' : 'Log in instead'}
            onPress={switchAuthModeHandler}/>
        </>
        
    );
  }
  
  export default AuthContent;
  
  const styles = StyleSheet.create({
    button: {
        marginBottom: 4,
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold'
      }  
  });