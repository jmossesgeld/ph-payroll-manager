import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees";
import timeKeepingReducer from "./timekeeping";
import holidayReducer from "./holidays";
import userprefsReducer from "./userprefs";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    timeKeeping: timeKeepingReducer,
    holidays: holidayReducer,
    userprefs: userprefsReducer,
  },
});
