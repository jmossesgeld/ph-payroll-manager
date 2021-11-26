import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "timeRecords",
  initialState,
  reducers: {
    createRecord: (state, action) => {
      state.push({ ...action.payload, id: state.length });
    },
    updateRecord: (state, action) => {
      const { key, index, newValue } = action.payload;
      state[index][key] = newValue;
    },
  },
});

export const { createRecord, updateRecord } = slice.actions;
export default slice.reducer;
