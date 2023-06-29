import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  [email: string]: string[]; 
}

interface FavoritePayload {
  email: string;
  restaurantId: string;
}

const favoriteSlice = createSlice({
  name: 'favorite' as string,
  initialState: {} as FavoriteState,
  reducers: {
    addFavorite: (state: FavoriteState, action: PayloadAction<FavoritePayload>): void => {
      const { email, restaurantId }: FavoritePayload = action.payload;
      if (!state[email]) {
        state[email] = [];
      }
      state[email].push(restaurantId);
    },
    removeFavorite: (state: FavoriteState, action: PayloadAction<FavoritePayload>): void => {
      const { email, restaurantId }: FavoritePayload = action.payload;
      if (!state[email]) {
        return;
      }
      const index: number = state[email].indexOf(restaurantId);
      if (index !== -1) {
        state[email].splice(index, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;

export type RootState = ReturnType<typeof favoriteSlice.reducer>;
