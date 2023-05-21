import { useState } from 'react';
import { Button,StyleSheet, TextInput,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

function SignUpForm({isLogin,onSubmit, credentialsInvalid}){
    const [inputEmail,setEmail] = useState('');
    const [inputConfirmEmail,setConfirmEmail] = useState('');
    const [inputPassword,setPassword] = useState('');
    const [inputConfirmPassword,setConfirmPassword] = useState('');
    

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
      } = credentialsInvalid;

    function UpdateInputHandler(type,value){
        switch(type){
            case 'email': setEmail(value);
                break;
            case 'confirmEmail': setConfirmEmail(value);
                break;
            case 'password': setPassword(value);
                break;
            case 'confirmPassword': setConfirmPassword(value);
                break;
        }
    }
         
    function submitHandler(){
        onsubmit({
            email: inputEmail,
            confirmEmail: inputConfirmEmail,
            password: inputPassword,
            confirmPassword: inputConfirmPassword
        });
    }

    return (
        <>  
            <TextInput
                style={[styles.input,emailIsInvalid && styles.inputInvalid ]}
                onChangeText={UpdateInputHandler.bind(this, 'email')}
                value={inputEmail}
                keyboardType="email-address"
            />
            <TextInput secureTextEntry={true} 
            style={[styles.input,passwordIsInvalid && styles.inputInvalid ]}
            onChangeText={UpdateInputHandler.bind(this, 'password')}
            value={inputPassword} />

            <Button
            title={isLogin ? 'Log In' : 'Sign Up'}
            onPress={submitHandler}/>
        </>
    );
}
    export default SignUpForm;

    const styles = StyleSheet.create({
        buttons: {
          marginTop: 12,
        },
        inputInvalid: {
            backgroundColor: '#fcdcbf',
          },
      });