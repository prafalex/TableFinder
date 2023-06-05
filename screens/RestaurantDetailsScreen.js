import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { getAllRestaurants } from "../util/http";
import { Colours } from "../variables/colours.js";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/storeRedux";
import { AuthContext } from "../context/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantContext } from "../context/restaurant-context";


function RestaurantDetailsScreen({ route, navigation }) {
  const authContext = useContext(AuthContext);

  const favoriteRestaurants = useSelector(
    (state) => state.favoriteRestaurants[authContext.email] || []
  );

  const restaurantIsFavorite = favoriteRestaurants.includes(
    route.params.restaurantId
  );

  const dispatch = useDispatch();

  function favoriteToggler() {
    if (restaurantIsFavorite) {
      dispatch(
        removeFavorite({
          email: authContext.email,
          restaurantId: route.params.restaurantId,
        })
      );
    } else {
      dispatch(
        addFavorite({
          email: authContext.email,
          restaurantId: route.params.restaurantId,
        })
      );
    }
  }

  const restaurantId = route.params.restaurantId;
  const restaurantContext = useContext(RestaurantContext);
  const selectedRestaurant = restaurantContext.getRestaurant(restaurantId);

  useEffect(() => {
    navigation.setOptions({ title: selectedRestaurant.name });
  }, [selectedRestaurant, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: selectedRestaurant.restaurant_img }}
        style={styles.image}
      ></Image>
      <Text style={styles.title}>{selectedRestaurant.name} ($$$)</Text>
      <View>
        <Text style={styles.description}>{selectedRestaurant.description}</Text>
        <Text style={styles.textItem}>
          Category: {selectedRestaurant.category}
        </Text>
        <Text style={styles.textItem}>
          Program: {selectedRestaurant.program}
        </Text>
        <Text style={styles.textItem}>
          Address: {selectedRestaurant.address}
        </Text>
        <Text style={styles.textItem}>
          PhoneNumber: {selectedRestaurant.phone_number}
        </Text>
      </View>
      <View>
        <View style={styles.menuContainer}>
          <Text style={styles.title}>Menu</Text>
        </View>
        {selectedRestaurant.menu_items?.map((item) => (
          <Text key={item} style={styles.menuItem}>
            {item}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BookingPage", { restaurantId: data.id })
        }
        style={styles.bookingButton}
      >
        <View style={styles.iconContainer}>
          <Icon name="cutlery" size={20} color="#FFF" />
        </View>
        <Text style={styles.bookingButtonText}>Book a Table</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => favoriteToggler()}
        style={styles.bookingButton}
      >
        <View style={styles.iconContainer}>
          <Icon name="star" size={20} color="#FFF" />
        </View>
        <Text style={styles.bookingButtonText}>
          {restaurantIsFavorite ? "Remove from favorites" : "Add to favorites"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VideoPresentation", { restaurantId: data.id })
        }
        style={styles.bookingButton}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="videocam" size={24} color="#FFF" />
        </View>
        <Text style={styles.bookingButtonText}>Video presentation</Text>
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
    margin: 16,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
    fontSize: 24,
    margin: 6,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    margin: 8,
  },
  textItem: {
    marginHorizontal: 16,
    marginVertical: 6,
    fontSize: 20,
  },
  menuItem: {
    marginHorizontal: 16,
    marginVertical: 6,
    fontSize: 20,
  },
  menuContainer: {
    borderBottomWidth: 4,
    margin: 16,
  },
  text: {
    color: "#FFF",
    marginLeft: 8,
    fontSize: 18,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bookingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colours.backgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: Dimensions.get("window").width * 0.6,
    alignSelf: "center",
  },
  bookingButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});
