import { useState,useContext } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import {UserLogin} from '../../util/firebaseAuth';
import { StyleSheet, Text, View,ActivityIndicator,Alert } from 'react-native';
import { AuthContext } from '../../context/auth-context';
import 'firebase/auth';
import React from 'react';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import {getAuth,FacebookAuthProvider,signInWithCredential} from 'firebase/auth';
import app from '../../util/firebase';
import { useRoute } from '@react-navigation/native'; // Import useRoute

WebBrowser.maybeCompleteAuthSession();


function LoginScreen(){
    const [isSigning,setIsSigning] = useState(false);

    const authContext = useContext(AuthContext);

    const route = useRoute();
    const previousEmail = route.params?.email;

    const auth = getAuth(app);

    const [request, response, promptAsync] = Facebook.useAuthRequest({
      clientId: "1290468008548474",
    });

    async function loginFirebase({email,password}){
        setIsSigning(true);
        try{
            const token = await UserLogin(email,password);
            authContext.authenticate(token,email);
        }catch(error){
            Alert.alert('Log in failed!','Could not authenticate you, maybe check your credentials!');
            console.log(error);
            setIsSigning(false);
        }
    }

    const logInWithFacebook = async () => {
        setIsSigning(true);
        
        const result = await promptAsync();
        if (result.type !== "success") {
          alert("Uh oh, something went wrong");
          return;
        }
    
        const credential = FacebookAuthProvider.credential(result.authentication.accessToken);
       
        try{
                const token = await signInWithCredential(auth,credential);
                authContext.authenticate(token._tokenResponse.idToken,token._tokenResponse.email);
        }catch(error){
                    Alert.alert('Log in failed!','Could not authenticate you, maybe check your credentials!');
                    console.log(error);
                    setIsSigning(false);
                }
        };

    if(isSigning){
        return (<View style={styles.rootContainer}>
                    <Text style={styles.message}>Waiting for log in...</Text>
                    <ActivityIndicator size="large" />
                </View>);
    }

    return <AuthContent isLogin onAuthenticate={loginFirebase}  facebookLogin={logInWithFacebook}/>;
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