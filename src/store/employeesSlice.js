import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [
    {
      id: "0",
      lastName: "Dela Cruz",
      firstName: "Juan",
      middleName: "A.",
      dailyrate: true,
      salary: 500,
    },
  ],
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
