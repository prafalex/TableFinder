import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { Colours } from "../variables/colours.js";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../context/restaurant-context";

function Review({ restaurantId, email, title, content, score, onPress }) {
  const restaurantContext = useContext(RestaurantContext);
  const restaurant = restaurantContext.getRestaurant(restaurantId);

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={styles.button}
        onPress={onPress}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{restaurant.name}</Text>
          <Text style={styles.text}>Email: {email}</Text>
          <Text style={styles.text}>Title: {title}</Text>
          <Text style={styles.text}>Content: {content}</Text>
          <Text style={styles.text}>Score: {score}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    backgroundColor: Colours.primaryColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  button: {
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});
