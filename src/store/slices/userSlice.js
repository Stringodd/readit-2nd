import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAPI from "../../api/UserAPI";
import errors from "../../api/errors";

const initialState = null;

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await UserAPI.userInfo();

    let value = false;
    if (!errors.isError(response)) {
      value = response.data;
      console.log("fetchUser", response.data);
    }

    return value;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
  }

  return null;
});

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Add user to the state array
      state = action.payload;
    });
  },
});

export default user.reducer;
