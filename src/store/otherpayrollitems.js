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
      state.push(action.payload);
    },
    updateDeductionItem(state, action) {
      const { item, isActive } = action.payload;
      state[item] = { ...state[item], isActive };
    },
    disableDeductionItem(state, action) {
      const { item } = action.payload;
      state[item] = { ...state[item], isActive: false };
    },
    removeDeductionItem(state, action) {
      const index = state.findIndex((item) => item.name === action.payload.name);
      state.splice(index, 1);
    },
  },
});

export const { addDeductionItem, updateDeductionItem, disableDeductionItem, removeDeductionItem } =
  slice.actions;
export default slice.reducer;
