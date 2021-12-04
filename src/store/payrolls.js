import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "payrolls",
  initialState,
  reducers: {
    createPayroll: (state, action) => {
      state.push({ ...action.payload, id: state.length });
    },
    updatePayroll: (state, action) => {
      const { key, index, newValue } = action.payload;
      state[index][key] = newValue;
    },
  },
});

export const { createPayroll, updatePayroll } = slice.actions;
export default slice.reducer;
