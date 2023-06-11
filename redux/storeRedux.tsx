import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  [email: string]: string[]; // use email as the key and store an array of restaurantIds
}

interface FavoritePayload {
  email: string;
  restaurantId: string;
}

const favoriteSlice = createSlice({
  name: 'favorite' as string,
  initialState: {} as FavoriteState,
  reducers: {
    addFavorite: (state : FavoriteState, action: PayloadAction<FavoritePayload>) : void => {
      const { email, restaurantId } : FavoritePayload = action.payload;
      if (!state[email]) {
        state[email] = [];
      }
      state[email].push(restaurantId);
    },
    removeFavorite: (state : FavoriteState, action: PayloadAction<FavoritePayload>) : void => {
      const { email, restaurantId } : FavoritePayload = action.payload;
      if (!state[email]) {
        return;
      }
      const index : number = state[email].indexOf(restaurantId);
      if (index !== -1) {
        state[email].splice(index, 1);
      }
    },
  },
});

export const addFavorite: (
  payload: FavoritePayload ) => PayloadAction<FavoritePayload> = favoriteSlice.actions.addFavorite;

export const removeFavorite: (
  payload: FavoritePayload ) => PayloadAction<FavoritePayload> = favoriteSlice.actions.removeFavorite;

export const store: ReturnType<typeof configureStore> = configureStore({
    reducer: { favoriteRestaurants: favoriteSlice.reducer}
});
