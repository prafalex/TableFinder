import { createContext, useState, ReactNode } from 'react';

interface Review {
  id: string;
  restaurantId: string;
  email: string;
  title: string;
  content: string;
  score: number;
}

interface ReviewContextValue {
  reviews: Review[];
  getReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, review: Review) => void;
  deleteReview: (id: string) => void;
  getReview: (id: string) => Review | undefined;
  getReviewsByRestaurant: (restaurantId: string) => Review[];
  getReviewsByEmail: (email: string) => Review[];
}

export const ReviewContext = createContext<ReviewContextValue>({
  reviews: [],
  getReviews: () => {},
  addReview: () => {},
  updateReview: () => {},
  deleteReview: () => {},
  getReview: () => undefined,
  getReviewsByRestaurant: () => [],
  getReviewsByEmail: () => [],
});

interface ReviewContextProviderProps {
  children: ReactNode;
}

function ReviewContextProvider({ children }: ReviewContextProviderProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  function getReviews(reviews: Review[]) {
    setReviews(reviews);
  }

  function addReview(review: Review) {
    setReviews(currentReviews => [...currentReviews, review]);
  }

  function updateReview(id: string, review: Review) {
    const selectedReview = getReview(id);
    const selectedReviewIndex = reviews.findIndex(review => review.id === id);
    if(selectedReview && selectedReviewIndex >= 0){
      const updatedReview = { ...selectedReview, ...review };
      const updatedReviews = [...reviews];
      updatedReviews[selectedReviewIndex] = updatedReview;
      setReviews(updatedReviews);
    }
  }

  function deleteReview(id: string) {
    const filteredReviews = reviews.filter(review => review.id !== id);
    setReviews(filteredReviews);
  }

  function getReview(id: string) {
    const selectedReview = reviews.find(review => review.id === id);
    return selectedReview;
  }

  function getReviewsByRestaurant(restaurantId: string) {
    const filteredReviews = reviews.filter(
      review => review.restaurantId === restaurantId
    );
    return filteredReviews;
  }

  function getReviewsByEmail(email: string) {
    const filteredReviews = reviews.filter(review => review.email === email);
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
