import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieApi from "../../api/MovieAPI";
import errors from "../../api/errors";

const initialState = null;

export const fetchMovie = createAsyncThunk("movie/fetchMovie", async () => {
  try {
    const response = await MovieApi.getAllMovie();
    console.log(response);
    let value = false;
    if (!errors.isError(response)) {
      value = response.data;
      console.log("Movie", response.data);
    }

    return value;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
  }

  return null;
});

export const movie = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      // Add user to the state array
      state = action.payload;
    });
  },
});

export default movie.reducer;
