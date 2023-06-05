import { createContext } from "react";
import { useContext, useEffect, useState } from "react";

export const RestaurantContext = createContext({
  restaurants: [],
  getRestaurants: (restaurants) => {},
  getRestaurant: (id) => {},
  addRestaurant: (restaurant) => {},
});

function RestaurantContextProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);

  function getRestaurants(restaurants) {
    setRestaurants(restaurants);
  }

  function getRestaurant(id) {
    const selectedRestaurant = restaurants.find(
      (restaurant) => restaurant.id === id
    );
    return selectedRestaurant;
  }

  function addRestaurant(restaurant) {
    setRestaurants((currentRestaurants) => [...currentRestaurants, restaurant]);
  }

  const value = {
    restaurants: restaurants,
    getRestaurants: getRestaurants,
    addRestaurant: addRestaurant,
    getRestaurant: getRestaurant,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

export default RestaurantContextProvider;
