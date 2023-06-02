import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { Colours } from "../variables/colours.js";
function Restaurant({ name, imgUrl, category, price, program, onPress }) {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={styles.button}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: imgUrl }} style={styles.image}></Image>
          <Text style={styles.name}>{name} ($$$)</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Category: {category}</Text>
          <Text style={styles.detail}>Score</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Restaurant;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colours.secondaryColor,
    overflow: "hidden",
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detail: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
