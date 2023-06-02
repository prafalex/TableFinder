import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView} from "react-native";
import { getAllRestaurants } from "../util/http";
import { Colours } from "../variables/colours.js";

function RestaurantDetailsScreen({ route }) {
  const restaurantId = route.params.restaurantId;
  const [data, setData] = useState({});

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
  }
});