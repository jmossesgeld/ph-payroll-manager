import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "sssLoan", isActive: true, header: "SSS Loan" },
  { name: "phicLoan", isActive: true, header: "PHIC Loan" },
  { name: "hdmfLoan", isActive: true, header: "HDMF Loan" },
  { name: "cashAdvance", isActive: true, header: "Cash Advance" },
];

const slice = createSlice({
  name: "payrollitems",
  initialState,
  reducers: {
    addDeductionItem(state, action) {
      const { item } = action.payload;
      state[item] = { ...state[item], isActive: true };
    },
    disableDeductionItem(state, action) {
      const { item } = action.payload;
      state[item] = { ...state[item], isActive: false };
    },
  },
});

export const { addDeductionItem, disableDeductionItem } = slice.actions;
export default slice.reducer;
 