import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { date: "2021-11-15", type: "regular", description: "Bonifacio Day" },
  { date: "2021-11-15", type: "regular", description: "Bonifacio Day" },
];

const slice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    addHoliday: (state, action) => {
      state.push(action.payload);
    },
    removeHoliday: (state, action) => {
      const existingHolidayIndex = state.findIndex(
        (holiday) =>
          holiday.date === action.payload.date && holiday.description === action.payload.description
      );
      if (existingHolidayIndex !== -1) {
        state.splice(existingHolidayIndex, 1);
      }
    },
  },
});

export const { addHoliday, removeHoliday } = slice.actions;
export default slice.reducer;
