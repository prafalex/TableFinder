import { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getAllRestaurants, getAllReviews } from '../../util/http';
import Restaurant from '../../components/Restaurant';
import { RestaurantContext } from '../../context/restaurant-context';
import { ReviewContext } from '../../context/review-context';
import ErrorOverlay from '../../components/utils/ErrorOverlay';
import { LoggedStackParamList } from '../../util/StackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type RestaurantsScreenNavigationProp = StackNavigationProp<
  LoggedStackParamList,
  'RestaurantsScreen'
>;

interface RestaurantsScreenProps {
  navigation: RestaurantsScreenNavigationProp;
}

interface RestaurantData {
  id: string;
  name: string;
  restaurant_img: string;
  category: string;
  price?: string;
}

const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({
  navigation,
}) => {
  const restaurantContext = useContext(RestaurantContext);
  const reviewContext = useContext(ReviewContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurants = await getAllRestaurants();
        restaurantContext.getRestaurants(restaurants);

        const reviews = await getAllReviews();
        reviewContext.getReviews(reviews);
      } catch (error) {
        setError('Could not get data!');
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  const renderRestaurant = ({ item }: { item: RestaurantData }) => {
    const pressHandler = () => {
      navigation.navigate('RestaurantDetailsScreen', {
        restaurantId: item.id,
      });
    };

    const restaurantProps = {
      id: item.id,
      name: item.name,
      imgUrl: item.restaurant_img,
      category: item.category,
      price: item.price,
      onPress: pressHandler,
    };

    return <Restaurant {...restaurantProps} />;
  };

  return (
    <FlatList
      data={restaurantContext.restaurants}
      keyExtractor={item => item.id}
      renderItem={renderRestaurant}
      numColumns={2}
    />
  );
};

export default RestaurantsScreen;
