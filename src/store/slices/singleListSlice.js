import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ListAPI from "../../api/ListAPI";
import errors from "../../api/errors";

const initialState = {
  list: false,
};

export const fetchList = createAsyncThunk("lists/fetchList", async (listid) => {
  try {
    const response = await ListAPI.currentList(listid);

    let value = false;
    if (!errors.isError(response)) {
      value = response.data.data;
      console.log("fetchList", response.data);
    }

    return value;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
  }

  return null;
});

export const list = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchList.fulfilled]: (state, action) => {
      state.list = action.payload;
      console.log(state.list);
    },
  },
});

export default list.reducer;
