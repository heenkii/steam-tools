import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_WEBSITE_NAME}/auth/me`,
    {
      withCredentials: true,
    }
  );
  return data.user;
});

export const logout = () => { };

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const authReducer = authSlice.reducer;
