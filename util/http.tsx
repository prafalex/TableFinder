import axios, { AxiosResponse } from 'axios'

const BACKEND_URL: string =
  'https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app'


interface Restaurant {
  id: string
  name: string
  address: string
  description: string
  category: string
  phone_number: string
  score: number
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

interface Review {
  id: string;
  restaurantId: string;
  email: string;
  title: string;
  content: string;
  score: number;
}

export async function addRestaurant(restaurantData: Omit<Restaurant, 'id'>) {
  const response = await axios.post(BACKEND_URL + "/restaurants.json", restaurantData);
  const id = response.data.name;
  return id;
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
      score: response.data[key].score,
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

export async function addReview(reviewData: Omit<Booking, 'id'>) {
  const response = await axios.post(BACKEND_URL + "/reviews.json", reviewData);
  const id = response.data.name;
  return id;
}

export async function updateReview(id: string, reviewData: Omit<Booking, 'id'>) {
  const response = await axios.put(
    BACKEND_URL + `/reviews/${id}.json`,
    reviewData
  );
}

export async function deleteReview(id:string) {
  const response = await axios.delete(BACKEND_URL + `/reviews/${id}.json`);
}

export async function getAllReviews() {
  const response = await axios.get(BACKEND_URL + "/reviews.json");
  const reviews = [];

  for (const key in response.data) {
    const reviewObj = {
      id: key,
      restaurantId: response.data[key].restaurantId,
      email: response.data[key].email,
      title: response.data[key].title,
      content: response.data[key].content,
      score: response.data[key].score,
    };
    reviews.push(reviewObj);
  }
  return reviews;
}