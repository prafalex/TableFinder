import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import { Colours } from '../../variables/colours';

interface CredentialsInvalid {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

interface UserFormProps {
  isLogin: boolean;
  onSubmit: (credentials: Credentials) => void;
  credentialsInvalid: CredentialsInvalid;
}

interface Credentials {
  email: string;
  password: string;
  confirmPassword ?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  isLogin,
  onSubmit,
  credentialsInvalid,
}) => {
 const [inputEmail, setEmail] = useState<string>('');
 const [inputPassword, setPassword] = useState<string>('');
 const [inputConfirmPassword, setConfirmPassword] = useState<string>('');
    

 const { email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch } : CredentialsInvalid = credentialsInvalid;

 const UpdateInputHandler = (type: string, value: string) : void => {
    switch (type) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  };

  const submitHandler = () : void => {
    const credentials: Credentials = {
        email: inputEmail,
        password: inputPassword,
        confirmPassword: inputConfirmPassword,
    };
    onSubmit(credentials);
  };

  return (
    <View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, emailIsInvalid && styles.labelInvalid]}>Email</Text>
          <TextInput
            style={[styles.input, emailIsInvalid && styles.inputInvalid]}
            onChangeText={UpdateInputHandler.bind(this, 'email')}
            value={inputEmail}
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text style={[styles.label, passwordIsInvalid && styles.labelInvalid]}>Password</Text>
          <TextInput
            secureTextEntry
            style={[styles.input, passwordIsInvalid && styles.inputInvalid]}
            onChangeText={UpdateInputHandler.bind(this, 'password')}
            value={inputPassword}
          />
        </View>

        {!isLogin && (
          <View>
            <Text style={[styles.label, passwordsDontMatch && styles.labelInvalid]}>
              Retype password
            </Text>
            <TextInput
              secureTextEntry
              style={[styles.input, passwordsDontMatch && styles.inputInvalid]}
              onChangeText={UpdateInputHandler.bind(this, 'confirmPassword')}
              value={inputConfirmPassword}
            />
          </View>
        )}

        <View style={styles.button}>
          <Pressable onPress={submitHandler}>
            <Text style={styles.textButton}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputInvalid: {
    backgroundColor: Colours.errorMain,
  },
  input: {
    width: 350,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 4,
    fontSize: 16,
  },
  label: {
    color: 'black',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colours.errorSecondary,
  },
  inputContainer: {
    marginVertical: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
    height: 50,
    borderRadius: 7,
    backgroundColor: Colours.primaryColor,
  },
  textButton: {
    alignSelf: 'center',
    paddingHorizontal: 70,
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
export {CredentialsInvalid,Credentials};
export default UserForm;
