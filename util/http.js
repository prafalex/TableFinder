import axios from "axios";

const BACKEND_URL =
  "https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app";

export async function addRestaurant(restaurantData) {
  const response = await axios.post(
    BACKEND_URL + "/restaurants.json",
    restaurantData
  );
  const id = response.data.name;
  return id;
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

export async function addBooking(bookingData) {
  const response = await axios.post(
    BACKEND_URL + "/bookings.json",
    bookingData
  );
  const id = response.data.name;
  return id;
}

export async function getAllBookings() {
  const response = await axios.get(BACKEND_URL + "/bookings.json");
  const bookings = [];

  for (const key in response.data) {
    const bookingObj = {
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

export async function addReview(reviewData) {
  const response = await axios.post(BACKEND_URL + "/reviews.json", reviewData);
  const id = response.data.name;
  return id;
}

export async function updateReview(id, reviewData) {
  const response = await axios.put(
    BACKEND_URL + `/reviews/${id}.json`,
    reviewData
  );
}

export async function deleteReview(id) {
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
