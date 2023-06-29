import React, { useEffect, useState, useContext } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Colours } from '../../variables/colours';
import { AuthContext } from '../../context/auth-context';
import { RestaurantContext } from '../../context/restaurant-context';
import { ReviewContext } from '../../context/review-context';
import ReviewForm from '../../components/ReviewForm';
import { addReview, updateReview, deleteReview } from '../../util/http';
import { useDispatch } from 'react-redux';
import { addScore, removeScore } from '../../redux/score';
import ErrorOverlay from '../../components/utils/ErrorOverlay';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllStackParamList } from '../../util/StackParamList';

type UpsertReviewScreenRouteProp = RouteProp<
  AllStackParamList,
  'UpsertReviewScreen'
>;

type UpsertReviewScreenNavigationProp = NativeStackNavigationProp<
  AllStackParamList,
  'UpsertReviewScreen'
>;

interface UpsertReviewScreenProps {
  route: UpsertReviewScreenRouteProp;
  navigation: UpsertReviewScreenNavigationProp;
}

const UpsertReviewScreen: React.FC<UpsertReviewScreenProps> = ({
  route,
  navigation,
}) => {
  const authContext = useContext(AuthContext);
  const restaurantContext = useContext(RestaurantContext);
  const reviewContext = useContext(ReviewContext);

  const { reviewId } = route.params;
  const restaurantId = route.params?.restaurantId || ''; 

  const isNewReview = !reviewId;
  const email = authContext.email;

  const selectedReview = reviewContext.getReview(reviewId);
  const restaurant = restaurantContext.getRestaurant(restaurantId);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: isNewReview ? 'New review' : 'Edit review',
    });
  }, [isNewReview, restaurant, navigation]);

  const [error, setError] = useState<string | undefined>();

  async function deleteHandler() {
    return Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteReview(reviewId);
              reviewContext.deleteReview(reviewId);
              dispatch(
                removeScore({
                  restaurantId: restaurantId,
                  score: selectedReview?.score || 0,
                })
              );
              navigation.goBack();
            } catch (error) {
              setError('Could not delete the review!');
            }
          },
        },
        {
          text: 'No',
        },
      ]
    );
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function upsertHandler(reviewData: any) {
    if (isNewReview) {
      try {
        const id = await addReview({ restaurantId, email, ...reviewData });
        reviewContext.addReview({
          id,
          restaurantId,
          email,
          ...reviewData,
        });
        dispatch(
          addScore({
            restaurantId: restaurantId,
            score: reviewData.score,
          })
        );
      } catch (error) {
        setError('Could not add the review!');
      }
    } else {
      try {
        await updateReview(reviewId, { ...selectedReview, ...reviewData });
        reviewContext.updateReview(reviewId, reviewData);
        dispatch(
          removeScore({
            restaurantId: restaurantId,
            score: reviewData.score,
          })
        );
        dispatch(
          addScore({
            restaurantId: restaurantId,
            score: reviewData.score,
          })
        );
      } catch (error) {
        setError('Could not update the review!');
      }
    }

    navigation.goBack();
  }

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {isNewReview
          ? `Leave a review for ${restaurant?.name || ''}!`
          : selectedReview?.title}
      </Text>
      <ReviewForm
        cancelHandler={cancelHandler}
        deleteHandler={deleteHandler}
        upsertHandler={upsertHandler}
        isNewReview={isNewReview}
        defaultValues={selectedReview}
      />
    </ScrollView>
  );
};

export default UpsertReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colours.secondaryColor,
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    fontSize: 24,
    color: Colours.textColor,
  },
});
