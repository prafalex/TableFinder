import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity} from "react-native";
import { getAllRestaurants } from "../util/http";
import { Colours } from "../variables/colours.js";
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';


function RestaurantDetailsScreen({ route }) {
  const restaurantId = route.params.restaurantId;
  const [data, setData] = useState({});

  const navigation = useNavigation();


  useEffect(() => {
    const fetchData = async () => {
      const restaurants = await getAllRestaurants();
      const selectedRestaurant = restaurants.find(
        (restaurant) => restaurant.id === restaurantId
      );
      setData(selectedRestaurant);
    };

    fetchData();
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: data.restaurant_img }} style={styles.image}></Image>
      <Text style={styles.title}>{data.name} ($$$)</Text>
      <View>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.textItem}>Category: {data.category}</Text>
        <Text style={styles.textItem}>Program: {data.program}</Text>
        <Text style={styles.textItem}>Address: {data.address}</Text>
        <Text style={styles.textItem}>PhoneNumber: {data.phone_number}</Text>
      </View>
      <View>
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Menu</Text>
          </View>
          {data.menu_items?.map((item) => (
            <Text key={item} style={styles.menuItem}>{item}</Text>
          ))}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('BookingPage',{restaurantId:data.id})} style={styles.button}>
        <View style={styles.iconContainer}>
          <Icon name="cutlery" size={20} color="#FFF" />
        </View>
        <Text style={styles.text}>Book a Table</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default RestaurantDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colours.secondaryColor,
    overflow: "hidden",
  },
  image: {
    width: "92%",
    height: 200,
    borderRadius: 8,
    margin: 16
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
    fontSize: 24,
    margin: 6
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    margin: 8
  },
  textItem: {
    marginHorizontal: 16,
    marginVertical: 6,
    fontSize: 20
  },
  menuItem: {
    marginHorizontal: 16,
    marginVertical: 6,
    fontSize: 20
  },
  menuContainer: {
    borderBottomWidth: 4,
    margin: 16
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 18,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});