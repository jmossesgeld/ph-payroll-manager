import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees";
import timerecordsReducer from "./timerecords";
import holidayReducer from "./holidays";
import userprefsReducer from "./userprefs";
import payrollsReducer from "./payrolls";
import otherpayrollitemsReducer from "./otherpayrollitems";

class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem("magePayrollState");

      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("magePayrollState", serializedState);
    } catch (err) {}
  }
}

const stateLoader = new StateLoader();

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    timeKeeping: timerecordsReducer,
    holidays: holidayReducer,
    userprefs: userprefsReducer,
    payrolls: payrollsReducer,
    otherpayrollitems: otherpayrollitemsReducer,
  },
  preloadedState: stateLoader.loadState(),
});

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});
