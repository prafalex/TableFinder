import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState,useContext } from 'react';
import { AuthContext } from '../context/auth-context';
function WelcomeScreen() {
  const [messageFB,setMessageFB] = useState('');

  const authContext = useContext(AuthContext);


  //retrieving data from Firebase only if logged in check
  useEffect(() => {
    axios.get('https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app/demo.json?auth='+authContext.token).then((response) =>{
      setMessageFB(response.data);
    });
  },[authContext.token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Home page...</Text>
      <Text>Currently testing!</Text>
      <Text>{messageFB}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});