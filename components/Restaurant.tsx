import { useContext } from 'react';
import { ReviewContext } from '../context/review-context';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { Colours } from '../variables/colours';
import IconButton from "./utils/IconButton";

interface RestaurantProps {
  id: string;
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
  const { getReviewsByRestaurant } = useContext(ReviewContext);
  const reviews = getReviewsByRestaurant(id);
  const totalScore = reviews.reduce((acc, review) => acc + review.score, 0);
  const averageScore = reviews.length > 0 ? (totalScore / reviews.length).toFixed(2) : 'No reviews';

  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={styles.button}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <ImageBackground source={{ uri: imgUrl }} style={styles.image}>
            <View style={styles.scoreContainer}>
              <IconButton
                icon="star"
                color={Colours.favoriteColor}
                text={averageScore}
                onPress={() => {}}
              ></IconButton>
            </View>
          </ImageBackground>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>Category: {category}</Text>
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
    overflow: 'hidden',
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255, 0.7)'
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    fontSize: 16,
    color: Colours.textColor,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  detail: {
    marginHorizontal: 4,
    fontSize: 12,
    color: Colours.textColor,
  },
});
