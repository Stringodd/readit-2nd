import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieAPI from "../../api/MovieAPI";
import errors from "../../api/errors";
import { useSelector } from "react-redux";
import UserAPI from "../../api/UserAPI";

const initialState = {
  movie: false,
};

export const fetchMovie = createAsyncThunk(
  "movies/fetchMovie",
  async (movieTitle) => {
    try {
      console.log(movieTitle);
      const response = await MovieAPI.movieInfo(movieTitle);

      let value = false;
      if (!errors.isError(response)) {
        value = response.data.data;
        console.log("fetchMovie", response.data);
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

export const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovie.fulfilled]: (state, action) => {
      state.movie = action.payload;
      console.log(state.movie);
    },
  },
});

export default movie.reducer;
