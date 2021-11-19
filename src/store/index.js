import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees";
import timeKeepingReducer from "./timekeeping";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    timeKeeping: timeKeepingReducer,
  },
});
