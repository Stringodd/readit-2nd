import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errors from "../../api/errors";
import RatingsAPI from "../../api/RatingsAPI";
import UserAPI from "../../api/UserAPI";

const initialState = {
  userRating: false,
};

export const fetchUserRating = createAsyncThunk(
  "ratings/fetchUserRating",
  async (title) => {
    try {
      const userId = await UserAPI.userInfo();
      const response = await RatingsAPI.getUserRating(
        title,
        userId.data.data.uid
      );
      console.log(response.data.data);
      let value = false;
      if (!errors.isError(response)) {
        value = response.data.data;
        console.log("Rating", response.data);
      }

      return value;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }

    return null;
  }
);

export const userRating = createSlice({
  name: "userRating",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserRating.fulfilled]: (state, action) => {
      state.userRating = action.payload;
      console.log(state.userRating);
    },
  },
});

export default userRating.reducer;
