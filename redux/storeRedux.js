import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {},
  reducers: {
    addFavorite: (state, action) => {
      const { email, restaurantId } = action.payload; // change from userId to email
      if (!state[email]) { // use email as key
        state[email] = [];
      }
      state[email].push(restaurantId);
    },
    removeFavorite: (state, action) => {
      const { email, restaurantId } = action.payload; // change from userId to email
      if (!state[email]) { // use email as key
        return;
      }
      const index = state[email].indexOf(restaurantId);
      if (index !== -1) {
        state[email].splice(index, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export const store = configureStore({
  reducer: {
    favoriteRestaurants: favoriteSlice.reducer,
  },
});
