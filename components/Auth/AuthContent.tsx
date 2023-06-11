import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserForm, { Credentials,CredentialsInvalid } from './UserForm';
import { Colours } from '../../variables/colours.js';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: (credentials: Credentials) => void;
  facebookLogin: () => void;
}

const AuthContent: React.FC<AuthContentProps> = ({
  isLogin,
  onAuthenticate,
  facebookLogin,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [credentialsInvalid, setCredentialsInvalid] = useState<CredentialsInvalid>({
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
    let { email, password, confirmPassword } : Credentials = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid : boolean = email.includes('@');
    const passwordIsValid : boolean = password.length > 6;
    const passwordsAreEqual : boolean = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
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
        <View style={styles.button}>
          <Pressable onPress={switchAuthModeHandler}>
            <Text style={styles.textButton}>
              {isLogin ? 'Create a new user' : 'Log in instead'}
            </Text>
          </Pressable>
        </View>
        {isLogin && (
          <View style={styles.button}>
            <Pressable onPress={facebookLogin}>
              <Text style={styles.textButton}>Sign in with Facebook</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

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
    paddingVertical: 10,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
