import AuthContent from '../components/Auth/AuthContent';
import {UserCreate} from '../util/firebaseAuth';
import { StyleSheet, Text, View,ActivityIndicator,Alert } from 'react-native';
import { useState,useContext } from 'react';
import { AuthContext } from '../context/auth-context';

function SignupScreen(){

    const [isSigning,setIsSigning] = useState(false);

    const authContext = useContext(AuthContext)
    async function signupFirebase({email,password}){
        setIsSigning(true);
        try{
          const token = await UserCreate(email,password);
          authContext.authenticate(token,email);
        }catch(error){
          Alert.alert('Signing up failed!','Error while creating a new user, possible errror: mail already in use!');
          setIsSigning(false);
        }
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