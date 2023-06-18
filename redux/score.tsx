import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScoreState {
    [restaurantId: string]: number[]; 
}

interface ScorePayload {
    restaurantId: string;
    score: number;
}
const scoreSlice = createSlice({
    name: 'score' as string,
    initialState: {} as ScoreState,
    reducers: {
        addScore: (state: ScoreState, action: PayloadAction<ScorePayload>) => {
            const { restaurantId, score} : ScorePayload = action.payload;
            if (!state[restaurantId]) {
                state[restaurantId] = [];
              }
              state[restaurantId].push(score);
        },
        removeScore: (state: ScoreState, action: PayloadAction<ScorePayload>) => {
            const { restaurantId, score } : ScorePayload = action.payload;
            if (!state[restaurantId]) {
              return;
            }
            const index : number = state[restaurantId].indexOf(score);
            if (index !== -1) {
              state[restaurantId].splice(index, 1);
            }
        }
    }
});

export const addScore: (
    payload: ScorePayload ) => PayloadAction<ScorePayload> = scoreSlice.actions.addScore;
  
export const removeScore: (
payload: ScorePayload ) => PayloadAction<ScorePayload> = scoreSlice.actions.removeScore;

export default scoreSlice.reducer;
