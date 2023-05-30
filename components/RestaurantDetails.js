import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colours } from "../variables/colours.js";
function RestaurantDetails({ restaurantId }) {
  return (
    <View>
      <Text>Restaurant details - {restaurantId}</Text>
    </View>
  );
}

export default RestaurantDetails;

const styles = StyleSheet.create({});
