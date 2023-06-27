import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getAllRestaurants } from "../../util/http";
import Restaurant from "../../components/Restaurant";
import { RestaurantContext } from "../../context/restaurant-context";
import ErrorOverlay from "../../components/utils/ErrorOverlay";

function RestaurantsScreen({ navigation }) {
  function renderRestaurant(itemData) {
    function pressHandler() {
      navigation.navigate("RestaurantDetailsScreen", {
        restaurantId: itemData.item.id,
      });
    }
    const item = itemData.item;
    const restaurantProps = {
      id: item.id,
      name: item.name,
      imgUrl: item.restaurant_img,
      category: item.category,
      price: item.price,
    };
    return <Restaurant {...restaurantProps} onPress={pressHandler} />;
  }

  const restaurantContext = useContext(RestaurantContext);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurants = await getAllRestaurants();
        restaurantContext.getRestaurants(restaurants);
      } catch (error) {
        setError('Could not get restaurants!');
      }
    };
    fetchData();
  }, []);

  if(error) {
    return <ErrorOverlay message={error}/>
  }

  return (
    <FlatList
      data={restaurantContext.restaurants}
      keyExtractor={(item) => item.id}
      renderItem={renderRestaurant}
      numColumns={2}
    />
  );
}

export default RestaurantsScreen;
