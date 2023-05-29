import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState,useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import {getAllRestaurants} from '../util/http.js'

function Restaurants() {
  const [messageFB,setMessageFB] = useState('');
  
  const [retrievedRestaurants,setRetrievedRestaurants] = useState([]);

  const authContext = useContext(AuthContext);
  


    useEffect(() => {
        async function getRestaurants(){
           const restaurants = await getAllRestaurants();
           //console.log(restaurants);
           setRetrievedRestaurants(restaurants);
        }
        getRestaurants();
    },[]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Restaurants page...</Text>
      <Text>Currently testing!</Text>
      <Text>{messageFB}</Text>
    </View>
  );
}

export default Restaurants;

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