import { useContext, useEffect, useState} from "react";
import { FlatList } from "react-native";
import { getAllRestaurants } from "../util/http";
import Restaurant from "../components/Restaurant";

function renderRestaurant(itemData) {
    return <Restaurant name={itemData.item.name} img={itemData.item.restaurant_img}/>;
}

function RestaurantsScreen() {
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