import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getAllRestaurants } from "../../util/http";
import Restaurant from "../../components/Restaurant";
import { RestaurantContext } from "../../context/restaurant-context";

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

  useEffect(() => {
    const fetchData = async () => {
      const restaurants = await getAllRestaurants();
      restaurantContext.getRestaurants(restaurants);
    };

    fetchData();
  }, []);

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
