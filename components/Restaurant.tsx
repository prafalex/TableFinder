import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { Colours } from "../variables/colours.js";
import { useSelector, useDispatch } from 'react-redux';
import IconButton from "./utils/IconButton";

interface RestaurantProps {
  id: string,
  name: string;
  imgUrl: string;
  category: string;
  price?: string;
  program?: string;
  onPress: () => void;
}

const Restaurant: React.FC<RestaurantProps> = ({
  id,
  name,
  imgUrl,
  category,
  program,
  onPress,
}) => {

  const scores = useSelector((state) => (state as any).restaurantScore[id] || []);
  const value = 0;
  const restaurantScore = scores.reduce((acc:number, currentValue:number) => acc + currentValue, value) / scores.length;

  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={styles.button}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: imgUrl }} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Category: {category}</Text>
          <IconButton
            icon="star"
            color={Colours.favoriteColor}
            text={restaurantScore.toString()}
            onPress={()=> {}}
        ></IconButton>
        </View>
      </Pressable>
    </View>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 16,
    height: 180,
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
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
    fontSize: 16,
    color: Colours.textColor
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  detail: {
    marginHorizontal: 4,
    fontSize: 12,
    color: Colours.textColor
  },
});
