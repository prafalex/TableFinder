import axios, { AxiosResponse } from 'axios'

const BACKEND_URL: string =
  'https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app'

//not used at the moment
// export async function addRestaurant(restaurantData) {
//   const response = await axios.post(BACKEND_URL + "/restaurants.json", restaurantData);
//   const id = response.data.name;
//   return id;
// }

interface Restaurant {
  id: string
  name: string
  address: string
  description: string
  category: string
  phone_number: string
  price: string
  program: string
  restaurant_img: string
  menu_items: string
}

interface Booking {
  id: string;
  restaurant_id: string;
  people: number;
  date: string;
  time: string;
  email: string;
}


export async function getAllRestaurants() {
  const response: AxiosResponse = await axios.get(
    BACKEND_URL + '/restaurants.json'
  )
  const restaurants: Restaurant[] = []

  for (const key in response.data) {
    const restaurantObj: Restaurant = {
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
    }
    restaurants.push(restaurantObj)
  }
  return restaurants
}

export async function addBooking(bookingData: Omit<Booking, 'id'>): Promise<string> {
  const response: AxiosResponse<any> = await axios.post(BACKEND_URL + '/bookings.json', bookingData);
  const id: string = response.data.name;
  return id;
}


export async function getAllBookings(): Promise<Booking[]> {
  const response = await axios.get(BACKEND_URL + '/bookings.json');
  const bookings: Booking[] = [];

  for (const key in response.data) {
    const bookingObj: Booking = {
      id: key,
      restaurant_id: response.data[key].restaurantId,
      people: response.data[key].people,
      date: response.data[key].date,
      time: response.data[key].time,
      email: response.data[key].email,
    };
    bookings.push(bookingObj);
  }

  return bookings;
}
