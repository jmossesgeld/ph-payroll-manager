import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "", user: {}, isAuthenticated: false };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = slice.actions;
export default slice.reducer;
