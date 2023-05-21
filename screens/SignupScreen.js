import AuthContent from '../components/Auth/AuthContent';
import {UserCreate} from '../util/firebaseAuth';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import { useState } from 'react';

function SignupScreen(){

    const [isSigning,setIsSigning] = useState(false);

    async function signupFirebase({email,password}){
        setIsSigning(true);
        await UserCreate(email,password);
        setIsSigning(false);
    }

    if(isSigning){
        return (<View style={styles.rootContainer}>
                    <Text style={styles.message}>Signing up...</Text>
                    <ActivityIndicator size="large" />
                </View>);
    }

    return <AuthContent onAuthenticate={signupFirebase}/>;
}

export default SignupScreen;

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    message: {
      fontSize: 16,
      marginBottom: 12,
    },
  });