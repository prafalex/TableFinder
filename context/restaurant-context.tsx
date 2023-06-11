import { createContext } from "react";
import { useContext, useEffect, useState } from "react";

interface Restaurant {
  id: string;
  address: string;
  category: string;
  description: string;
  name: string;
  restaurant_img: string;
}

interface RestaurantContextValue {
  restaurants: Restaurant[];
  getRestaurants: (restaurants: Restaurant[]) => void;
  getRestaurant: (id: string) => Restaurant | undefined;
  addRestaurant: (restaurant: Restaurant) => void;
}

export const RestaurantContext = createContext<RestaurantContextValue>({
  restaurants: [],
  getRestaurants: (restaurants) => {},
  getRestaurant: (id) => undefined,
  addRestaurant: (restaurant) => {},
});

function RestaurantContextProvider({ children }: { children: React.ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  function getRestaurants(restaurants: Restaurant[]) : void {
    setRestaurants(restaurants);
  }

  function getRestaurant(id: string) : Restaurant | undefined {
    const selectedRestaurant  = restaurants.find(
      (restaurant) => restaurant.id === id
    );
    return selectedRestaurant;
  }

  function addRestaurant(restaurant: Restaurant) : void {
    setRestaurants((currentRestaurants) => [...currentRestaurants, restaurant]);
  }

  const value: RestaurantContextValue = {
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
