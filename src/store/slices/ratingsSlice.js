import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errors from "../../api/errors";
import RatingsAPI from "../../api/RatingsAPI";

const initialState = {
  ratings: false,
};

export const fetchRating = createAsyncThunk(
  "ratings/fetchRating",
  async (title) => {
    try {
      const response = await RatingsAPI.getRating(title);
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

export const ratings = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRating.fulfilled]: (state, action) => {
      state.ratings = action.payload;
      console.log(state.ratings);
    },
  },
});

export default ratings.reducer;
