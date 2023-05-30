import { View, Text, StyleSheet } from "react-native";
import RestaurantDetails from "../components/RestaurantDetails";

function RestaurantDetailsScreen({ route }) {
  const restaurantId = route.params.restaurantId;
  return (
    <View>
      <RestaurantDetails restaurantId={restaurantId} />
    </View>
  );
}

export default RestaurantDetailsScreen;
