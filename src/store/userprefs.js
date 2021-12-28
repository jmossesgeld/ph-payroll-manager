import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPayrollPeriod: { from: "", to: "" },
  animateTransitions: false,
  selectedEmployee: {},
};

const slice = createSlice({
  name: "userprefs",
  initialState,
  reducers: {
    setPayrollPeriodFrom: (state, action) => {
      state.currentPayrollPeriod.from = action.payload;
      const fromDate = new Date(action.payload);
      state.currentPayrollPeriod.to = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1)
        .toISOString()
        .substring(0, 10);
    },
    setPayrollPeriodTo: (state, action) => {
      state.currentPayrollPeriod.to = action.payload;
    },
    animateTransitions: (state, action) => {
      state.animateTransitions = action.payload;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
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

export const getTimeDifference = (start, end) => {
  const [startHour, startMinutes] = start.split(":").map((item) => parseInt(item));
  const [endHour, endMinutes] = end.split(":").map((item) => parseInt(item));
  const diffMinutes = (startMinutes - endMinutes) / 60;
  const diffHour = startHour - endHour;
  const result = diffHour + diffMinutes;
  if (isNaN(result)) {
    return 0;
  } else {
    return Math.round(result.toFixed(2) * 100) / 100;
  }
};

export const { setPayrollPeriodFrom, setPayrollPeriodTo, animateTransitions, setSelectedEmployee } =
  slice.actions;
export default slice.reducer;
