import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserForm, { Credentials, CredentialsInvalid } from './UserForm';
import { Colours } from '../../variables/colours';
import { AllStackParamList } from '../../util/StackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../utils/Button';

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: (credentials: Credentials) => void;
  facebookLogin?: () => Promise<void> | undefined;
}

const AuthContent: React.FC<AuthContentProps> = ({
  isLogin,
  onAuthenticate,
  facebookLogin,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AllStackParamList>>();

  const [credentialsInvalid, setCredentialsInvalid] =
    useState<CredentialsInvalid>({
      email: false,
      password: false,
      confirmPassword: false,
    });

  const switchAuthModeHandler = (): void => {
    if (isLogin) {
      navigation.navigate('Signup');
    } else {
      navigation.navigate('Login');
    }
  };

  const submitHandler = (credentials: Credentials): void => {
    let { email, password, confirmPassword }: Credentials = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid: boolean = email.includes('@');
    const passwordIsValid: boolean = password.length > 6;
    const passwordsAreEqual: boolean = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  };

  return (
    <View>
      <View style={styles.form}>
        <UserForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <Button
          style={{ button: styles.button, buttonText: styles.buttonText }}
          onPress={switchAuthModeHandler}
        >
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Button>
        {isLogin && facebookLogin && (
          <Button
            style={{ button: styles.button, buttonText: styles.buttonText }}
            onPress={facebookLogin}
          >
            Sign in with Facebook
          </Button>
        )}
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colours.secondaryColor,
  },
  buttonText: {
    color: Colours.textColor,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
