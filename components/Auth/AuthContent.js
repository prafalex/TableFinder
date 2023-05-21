import { useState } from 'react';
import { Alert,Button } from 'react-native';
import SignUpForm from './SignUpForm';
import {useNavigation} from '@react-navigation/native'

function AuthContent({ isLogin, onAuthenticate }) {

    const navigation = useNavigation();

    const [credentialsInvalid, setCredentialsInvalid] = useState({
      email: false,
      password: false,
      confirmEmail: false,
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
      let { email, confirmEmail, password, confirmPassword } = credentials;
  
      email = email.trim();
      password = password.trim();
  
      const emailIsValid = email.includes('@');
      const passwordIsValid = password.length > 6;
      const emailsAreEqual = email === confirmEmail;
      const passwordsAreEqual = password === confirmPassword;
  
      if (
        !emailIsValid ||
        !passwordIsValid ||
        (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
      ) {
        Alert.alert('Invalid input', 'Please check your entered credentials.');
        setCredentialsInvalid({
          email: !emailIsValid,
          confirmEmail: !emailIsValid || !emailsAreEqual,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }
      onAuthenticate({ email, password });
    }
  
    return (
        <>
        <SignUpForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}/>

          <Button
            title={isLogin ? 'Create a new user' : 'Log in instead'}
            onPress={switchAuthModeHandler}/>
        </>
        
    );
  }
  
  export default AuthContent;
  