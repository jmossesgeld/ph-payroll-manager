import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "sssLoan", isActive: false, header: "SSS Loan" },
  { name: "phicLoan", isActive: false, header: "PHIC Loan" },
  { name: "hdmfLoan", isActive: false, header: "HDMF Loan" },
  { name: "cashAdvance", isActive: true, header: "Cash Adv." },
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
 