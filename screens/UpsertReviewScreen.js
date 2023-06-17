import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Colours } from "../variables/colours.js";
import { AuthContext } from "../context/auth-context.tsx";
import { RestaurantContext } from "../context/restaurant-context.tsx";
import { ReviewContext } from "../context/review-context.js";
import ReviewForm from "../components/ReviewForm.js";
import { addReview, updateReview, deleteReview } from "../util/http";

function UpsertReviewScreen({ route, navigation }) {
  const authContext = useContext(AuthContext);
  const restaurantContext = useContext(RestaurantContext);
  const reviewContext = useContext(ReviewContext);

  const { restaurantId, reviewId } = route.params;

  const isNewReview = !reviewId;
  const email = authContext.email;

  const selectedReview = reviewContext.getReview(reviewId);
  const restaurant = restaurantContext.getRestaurant(restaurantId);

  useEffect(() => {
    navigation.setOptions({
      title: isNewReview ? "New review" : "Edit review",
    });
  }, [isNewReview, restaurant, navigation]);

  async function deleteHandler() {
    await deleteReview(reviewId);
    reviewContext.deleteReview(reviewId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function upsertHandler(reviewData) {
    if (isNewReview) {
      const id = await addReview({ restaurantId, email, ...reviewData });
      reviewContext.addReview({
        id,
        restaurantId,
        email,
        ...reviewData,
      });
    } else {
      await updateReview(reviewId, { ...selectedReview, ...reviewData });
      reviewContext.updateReview(reviewId, reviewData);
    }
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {isNewReview
          ? "Leave a review for " + restaurant.name + " !"
          : selectedReview?.title}
      </Text>
      <ReviewForm
        cancelHandler={cancelHandler}
        deleteHandler={deleteHandler}
        upsertHandler={upsertHandler}
        isNewReview={isNewReview}
        defaultValues={selectedReview}
      ></ReviewForm>
    </ScrollView>
  );
}

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
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    fontSize: 24,
    color: Colours.textColor
  },
});
