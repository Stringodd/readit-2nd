import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import favoritesAPI from "../../api/favoritesAPI";
import UserAPI from "../../api/UserAPI";
import errors from "../../api/errors";
import watchlistAPI from "../../api/watchlistAPI";

const initialState = {
  watchlist: false,
};

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async () => {
    try {
      const userId = await UserAPI.userInfo();

      const response = await watchlistAPI.getWatchlist(userId.data.data.uid);
      console.log(response);
      let value = false;
      if (!errors.isError(response)) {
        value = response;
        console.log("fetchWatchlist", response);
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

export const watchlist = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWatchlist.fulfilled]: (state, action) => {
      state.watchlist = action.payload;
      console.log(state.watchlist);
    },
  },
});

export default watchlist.reducer;
