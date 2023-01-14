import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import userReducer from "./slices/userSlice";
import favoriteMoviesReducer from "./slices/favoriteMovieSlice";
import watchMoviesReducer from "./slices/forWatchList";

export default configureStore({
  reducer: {
    mert: dataReducer,
    user: userReducer,
    favorite: favoriteMoviesReducer,
    forwatch: watchMoviesReducer,
    // redux store kısmı
  },
});
