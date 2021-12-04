import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees";
import timerecordsReducer from "./timerecords";
import holidayReducer from "./holidays";
import userprefsReducer from "./userprefs";
import payrollsReducer from "./payrolls";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    timeKeeping: timerecordsReducer,
    holidays: holidayReducer,
    userprefs: userprefsReducer,
    payrolls: payrollsReducer,
  },
});
