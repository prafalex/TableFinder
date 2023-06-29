import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colours } from '../variables/colours';
import { useContext } from 'react';
import { RestaurantContext } from '../context/restaurant-context';

interface ReviewProps {
  restaurantId: string;
  email: string;
  title: string;
  content: string;
  score: number;
  onPress: () => void;
}

const Review: React.FC<ReviewProps> = ({
  restaurantId,
  email,
  title,
  content,
  score,
  onPress,
}) => {
  const restaurantContext = useContext(RestaurantContext);
  const restaurant = restaurantContext.getRestaurant(restaurantId);

  return (
    <View style={styles.container}>
      <Pressable android_ripple={{ color: '#ccc' }} onPress={onPress}>
        <View style={styles.infoContainer}>
          {restaurant && (
            <Text style={styles.text}>Review for {restaurant.name}</Text>
          )}
          <Text style={styles.text}>From: {email}</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Title: {title}</Text>
            <Text style={styles.text}>{content}</Text>
            <Text style={styles.text}>Score: {score}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 20,
    backgroundColor: Colours.secondaryColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 20,
    width: '90%',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: Colours.textColor,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    paddingHorizontal: 20,
  },
});
