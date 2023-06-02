import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getAllRestaurants } from "../util/http";
import Restaurant from "../components/Restaurant";

function RestaurantsScreen({ navigation }) {
  function renderRestaurant(itemData) {
    function pressHandler() {
      navigation.navigate("RestaurantDetailsScreen", {
        restaurantId: itemData.item.id,
      });
    }
    const item = itemData.item;
    const restaurantProps = {
      name: item.name,
      imgUrl: item.restaurant_img,
      category: item.category,
      price: item.price
    }
    return (
      <Restaurant
        {...restaurantProps}
        onPress={pressHandler}
      />
    );
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const restaurants = await getAllRestaurants();
      setData(restaurants);
    };

    fetchData();
  }, []);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderRestaurant}
      numColumns={2}
    />
  );
}

export default RestaurantsScreen;
