import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, employeeId: 0, day: "", timeIn: "", timeOut: "", overtime: 0.0, dayCategories: [""] },
];

const slice = {
  name: "timeRecords",
  initialState,
  reducers: {
    putRecords: (state, action) => {
      for (let index = 0; index < action.payload.length; index++) {
        const newTimeRecord = action.payload[index];
        const existingRecordIndex = state.findIndex(
          (oldRecord) =>
            oldRecord.employeeId === newTimeRecord.employeeId && oldRecord.day === newTimeRecord.day
        );
        if (existingRecordIndex === -1) {
          state.push(newTimeRecord);
        } else {
          state[existingRecordIndex] = newTimeRecord;
        }
      }
    },
  },
};

export const { putRecords } = slice.actions;
export default slice.reducer;
