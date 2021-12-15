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
      state[index][key] = newValue;
    },
    replaceRecord: (state, action) => {
      const { index, newRecord } = action.payload;
      state[index] = newRecord;
    },
  },
});

export const { createRecord, updateRecord, replaceRecord } = slice.actions;
export default slice.reducer;
