import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./slices/games";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gameReducer,
  },
});

export default store;
