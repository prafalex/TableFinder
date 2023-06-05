import axios from "axios";

const BACKEND_URL =
  "https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app";

export function addRestaurant(restaurantData) {
  axios.post(BACKEND_URL + "/restaurants.json", restaurantData);
}

//how to use see: fetching backend data: 8:49
export async function getAllRestaurants() {
  const response = await axios.get(BACKEND_URL + "/restaurants.json");
  const restaurants = [];



  for (const key in response.data) {
    const restaurantObj = {
      id: key,
      name: response.data[key].name,
      address: response.data[key].address,
      description: response.data[key].description,
      category: response.data[key].category,
      phone_number: response.data[key].phone_number,
      price: response.data[key].price,
      program: response.data[key].program,
      restaurant_img: response.data[key].restaurant_img,
      menu_items: response.data[key].menu_items,
    };
    restaurants.push(restaurantObj);
  }
  return restaurants;
}
