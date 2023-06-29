import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getAllReviews } from '../../util/http';
import Review from '../../components/Review';
import { ReviewContext } from '../../context/review-context';
import { RestaurantContext } from '../../context/restaurant-context';
import { AuthContext } from '../../context/auth-context';
import ErrorOverlay from '../../components/utils/ErrorOverlay';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoggedStackParamList } from '../../util/StackParamList';

interface ReviewItem {
  id: string;
  email: string;
  title: string;
  content: string;
  score: number;
  restaurantId: string;
}

interface ReviewsScreenProps {
  route: RouteProp<LoggedStackParamList, 'ReviewsScreen'>;
  navigation: NativeStackNavigationProp<LoggedStackParamList, 'ReviewsScreen'>;
}

const ReviewsScreen: React.FC<ReviewsScreenProps> = ({ route, navigation }) => {
  const restaurantId = route.params?.restaurantId;
  const restaurantContext = useContext(RestaurantContext);
  const restaurant = restaurantContext.getRestaurant(restaurantId);

  const authContext = useContext(AuthContext);
  const currentUserEmail = authContext.email;

  function renderReview(itemData: { item: ReviewItem }) {
    const item = itemData.item;
    function pressHandler() {
      if (!restaurantId) {
        navigation.navigate('UpsertReviewScreen', {
          reviewId: item.id,
        });
      }
    }

    const reviewProps = {
      restaurantId: item.restaurantId,
      email: item.email,
      title: item.title,
      content: item.content,
      score: item.score,
    };

    return <Review {...reviewProps} onPress={pressHandler} />;
  }

  const reviewContext = useContext(ReviewContext);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getAllReviews();
        reviewContext.getReviews(reviews);
      } catch (error) {
        setError('Could not get reviews!');
      }
    };

    fetchData();
  }, []);

  let filteredReviews: ReviewItem[];
  if (restaurantId) {
    filteredReviews = reviewContext.getReviewsByRestaurant(restaurantId);
  } else {
    filteredReviews = reviewContext.getReviewsByEmail(currentUserEmail);
  }

  useEffect(() => {
    navigation.setOptions({
      title: restaurant ? 'Reviews - ' + restaurant.name : 'My reviews',
    });
  }, [restaurant, navigation]);

  let content = <Text style={styles.noReviewsText}>No reviews found.</Text>;
  if (filteredReviews.length) {
    content = (
      <FlatList
        data={filteredReviews}
        keyExtractor={item => item.id}
        renderItem={renderReview}
      />
    );
  }
  if (error) {
    return <ErrorOverlay message={error} />;
  }
  return <View>{content}</View>;
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  noReviewsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
