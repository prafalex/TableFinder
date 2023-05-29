import { useContext, useEffect, useState} from "react";
import { FlatList } from "react-native";
import { getAllRestaurants } from "../util/http";

function renderRestaurant(itemData) {
    return <Restaurant name={itemData.item.name} img={itemData.item.restaurant_img}/>;
}

function RestaurantsScreen() {
    const [data, setData] = useState({restaurants: []});

    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setData(restaurants) 
        };
        
        fetchData();
    }, []);
    return (
        <FlatList
          data={data.restaurants}
          keyExtractor={(item) => item.id}
          renderItem={renderRestaurant}
        />
    );
}

export default RestaurantsScreen;