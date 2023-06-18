import { createContext } from 'react';
import { useContext, useEffect, useState } from 'react';

export const ReviewContext = createContext({
  reviews: [],
  getReviews: reviews => {},
  addReview: review => {},
  updateReview: (id, review) => {},
  deleteReview: id => {},
  getReview: id => {},
  getReviewsByRestaurant: restaurantId => {},
  getReviewsByEmail: email => {},
});

function ReviewContextProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  function getReviews(reviews) {
    setReviews(reviews);
  }

  function addReview(review) {
    setReviews(currentReviews => [...currentReviews, review]);;
  }

  function updateReview(id, review) {
    const selectedReview = getReview(id);
    const selectedReviewIndex = reviews.findIndex(review => review.id == id);
    const updatedReview = { ...selectedReview, ...review };
    const updatedReviews = [...reviews];
    updatedReviews[selectedReviewIndex] = updatedReview;
    setReviews(updatedReviews);
  }

  function deleteReview(id) {
    const filteredReviews = reviews.filter(review => review.id != id);
    setReviews(filteredReviews);
  }

  function getReview(id) {
    const selectedReview = reviews.find(review => review.id === id);
    return selectedReview;
  }

  function getReviewsByRestaurant(restaurantId) {
    const filteredReviews = reviews.filter(
      review => review.restaurantId == restaurantId
    );

    return filteredReviews;
  }

  function getReviewsByEmail(email) {
    const filteredReviews = reviews.filter(review => review.email == email);
    return filteredReviews;
  }


  const value = {
    reviews: reviews,
    getReviews: getReviews,
    addReview: addReview,
    updateReview: updateReview,
    deleteReview: deleteReview,
    getReview: getReview,
    getReviewsByRestaurant: getReviewsByRestaurant,
    getReviewsByEmail: getReviewsByEmail,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export default ReviewContextProvider;
