import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPayrollPeriod: { from: "", to: "" },
};

const slice = createSlice({
  name: "userprefs",
  initialState,
  reducers: {
    setPayrollPeriodFrom: (state, action) => {
      state.currentPayrollPeriod.from = action.payload;
    },
    setPayrollPeriodTo: (state, action) => {
      state.currentPayrollPeriod.to = action.payload;
    },
  },
});

export const getDaysInBetween = (startDate, endDate) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startDateInMs = new Date(startDate);
  const endDateInMs = new Date(endDate);
  const timeDifference = endDateInMs - startDateInMs;
  const daysDifference = Math.ceil(timeDifference / msPerDay);
  let dates = [];

  for (let index = 0; index < daysDifference + 1 && index < 31; index++) {
    dates.push(new Date(startDateInMs.getTime() + msPerDay * index));
  }

  return dates;
};

export const { setPayrollPeriodFrom, setPayrollPeriodTo } = slice.actions;
export default slice.reducer;
