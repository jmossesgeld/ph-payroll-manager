import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "timeRecords",
  initialState,
  reducers: {
    createRecord: (state, action) => {
      console.log(action.payload);
      state.push({ ...action.payload, id: state.length });
    },
    updateRecord: (state, action) => {
      state[action.payload.index][action.payload.key] = action.payload.newValue;
    },
  },
});

export const { createRecord, updateRecord } = slice.actions;
export default slice.reducer;
