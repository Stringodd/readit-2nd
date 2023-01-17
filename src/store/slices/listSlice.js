import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ListAPI from "../../api/ListAPI";
import errors from "../../api/errors";
import { useSelector } from "react-redux";
import UserAPI from "../../api/UserAPI";

const initialState = {
  lists: false,
};

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  try {
    const userId = await UserAPI.userInfo();

    const response = await ListAPI.getAllLists(userId.data.data.uid);

    let value = false;
    if (!errors.isError(response)) {
      value = response.data.data;
      console.log("fetchLists", response.data);
    }

    return value;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
  }

  return null;
});

export const lists = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLists.fulfilled]: (state, action) => {
      state.lists = action.payload;
      console.log(state.lists);
    },
  },
});

export default lists.reducer;
