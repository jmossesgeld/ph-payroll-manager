import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees";
import timeKeepingReducer from "./timekeeping";
import holidayReducer from "./holidays";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    timeKeeping: timeKeepingReducer,
    holidays: holidayReducer,
  },
});
