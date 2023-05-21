import { useState } from 'react';
import { Button,StyleSheet, TextInput,Text,View } from 'react-native';


function UserForm({isLogin, onSubmit, credentialsInvalid}){
    const [inputEmail,setEmail] = useState('');
    const [inputPassword,setPassword] = useState('');
    const [inputConfirmPassword,setConfirmPassword] = useState('');
    

    const {
        email: emailIsInvalid,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
      } = credentialsInvalid;

    function UpdateInputHandler(type,value){
        switch(type){
            case 'email': setEmail(value);
                break;
            case 'password': setPassword(value);
                break;
            case 'confirmPassword': setConfirmPassword(value);
                break;
        }
    }
         
    function submitHandler(){
        onSubmit({
            email: inputEmail,
            password: inputPassword,
            confirmPassword: inputConfirmPassword
        });
    }

    return (
        <>  
            <View style={styles.inputContainer}>
                <Text style={[styles.label, emailIsInvalid && styles.labelInvalid]}>
                    Email
                </Text>
                <TextInput
                    style={[styles.input,emailIsInvalid && styles.inputInvalid ]}
                    onChangeText={UpdateInputHandler.bind(this, 'email')}
                    value={inputEmail}
                    keyboardType="email-address"
                />
            </View>
            
            <View>
                <Text style={[styles.label, passwordIsInvalid && styles.labelInvalid]}>
                    Password
                </Text>
                <TextInput secureTextEntry={true} 
                style={[styles.input,passwordIsInvalid && styles.inputInvalid ]}
                onChangeText={UpdateInputHandler.bind(this, 'password')}
                value={inputPassword} />
            </View>
               

            {!isLogin && (
            <View>
                <Text style={[styles.label, passwordsDontMatch && styles.labelInvalid]}>
                    Retype password
                </Text>
                <TextInput secureTextEntry={true} 
                style={[styles.input,passwordsDontMatch && styles.inputInvalid ]}
                onChangeText={UpdateInputHandler.bind(this, 'confirmPassword')}
                value={inputConfirmPassword} />     
            </View>
            
            )}

            <Button style={styles.button}
            title={isLogin ? 'Log In' : 'Sign Up'}
            onPress={submitHandler}/>
        </>
    );
}
    export default UserForm;

    const styles = StyleSheet.create({
        inputInvalid: {
            backgroundColor: '#fcdcbf',
          },
        input: {
            paddingVertical: 8,
            paddingHorizontal: 6,
            borderRadius: 4,
            fontSize: 16,
          },
        label: {
            color: 'black',
            marginBottom: 4,
          },
          labelInvalid: {
            color: 'red',
          },  
        inputContainer: {
            marginVertical: 8,
          },
        button: {
            borderRadius: 6,
            paddingVertical: 6,
            paddingHorizontal: 12,
            elevation: 2,
            shadowColor: 'black',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }
      });