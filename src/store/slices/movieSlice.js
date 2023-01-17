import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieApi from "../../api/MovieAPI";
import errors from "../../api/errors";

const initialState = {
  movies: false,
};

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  try {
    const response = await MovieApi.getAllMovies();
    console.log(response.data);
    let value = false;
    if (!errors.isError(response)) {
      value = response.data;
      console.log("Movies", response.data);
    }

    return value;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
  }

  return null;
});

export const movies = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.fulfilled]: (state, action) => {
      state.movies = action.payload;
      console.log(state.movies);
    },
  },
});

export default movies.reducer;
