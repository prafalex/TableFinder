import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorite';
import scoreReducer from './score';

export const store: ReturnType<typeof configureStore> = configureStore({
  reducer: {
    favoriteRestaurants: favoritesReducer,
    restaurantScore: scoreReducer
  },
});
