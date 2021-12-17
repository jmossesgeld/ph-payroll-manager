import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "timeRecords",
  initialState,
  reducers: {
    createRecord: (state, action) => {
      state.push({
        ...action.payload,
        id: `${new Date().getTime().toString()}no${state.length.toString()}`,
      });
    },
    updateRecord: (state, action) => {
      const { key, index, newValue } = action.payload;
      const record = state.find((record) => record.id === index);
      record[key] = newValue;
    },
  },
});

export const { createRecord, updateRecord } = slice.actions;
export default slice.reducer;
