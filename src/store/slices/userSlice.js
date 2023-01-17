import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAPI from "../../api/UserAPI";
import errors from "../../api/errors";

const initialState = {
  user: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await UserAPI.userInfo();

    let value = false;
    if (!errors.isError(response)) {
      value = response.data.data;
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
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
  },
});

export default user.reducer;
