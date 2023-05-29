import { useState,useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {UserLogin} from '../util/firebaseAuth';
import { StyleSheet, Text, View,ActivityIndicator,Alert } from 'react-native';
import { AuthContext } from '../context/auth-context';

function LoginScreen(){
    const [isSigning,setIsSigning] = useState(false);

    const authContext = useContext(AuthContext);

    async function loginFirebase({email,password}){
        setIsSigning(true);
        try{
            const token = await UserLogin(email,password);
            authContext.authenticate(token);
        }catch(error){
            Alert.alert('Log in failed!','Could not authenticate you, maybe check your credentials!');
            console.log(error);
            setIsSigning(false);
        }
    }

    if(isSigning){
        return (<View style={styles.rootContainer}>
                    <Text style={styles.message}>Waiting for log in...</Text>
                    <ActivityIndicator size="large" />
                </View>);
    }

    return <AuthContent isLogin onAuthenticate={loginFirebase} />;
}

export default LoginScreen;

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