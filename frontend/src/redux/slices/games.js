import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (steamId) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEBSITE_NAME}/api/games`,
      {
        params: { steamId64: steamId },
      }
    );
    return data.gamesData;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGames.pending]: (state, action) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchGames.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchGames.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const gameReducer = gameSlice.reducer;
