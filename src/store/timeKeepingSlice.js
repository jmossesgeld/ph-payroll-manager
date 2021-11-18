import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, employeeId: 0, day: 0, timeIn: 0, timeOut: 0, overtime: 0.0, dayCategories: [""] },
];

const slice = createSlice({
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
          state.push({ ...newTimeRecord, id: state.length });
        } else {
          state[existingRecordIndex] = newTimeRecord;
        }
      }
    },
    createRecord: (state, action) => {
      state.push({ ...action.payload, id: state.length });
    },
    updateRecord: (state, action) => {
      state[action.payload.index][action.payload.key] = action.payload.newValue;
    },
  },
});

export const { putRecords, createRecord, updateRecord } = slice.actions;
export default slice.reducer;
