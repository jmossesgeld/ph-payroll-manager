import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import timeKeepingReducer from "./timeKeepingSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    timeKeeping: timeKeepingReducer,
  },
});
