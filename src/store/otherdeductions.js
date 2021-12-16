import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sssLoan: { display: true, header: "SSS Loan" },
  phicLoan: { display: true, header: "PHIC Loan" },
  hdmfLoan: { display: true, header: "HDMF Loan" },
  cashAdvance: { display: false, header: "Cash Advance" },
};

const slice = createSlice({
  name: "payrollitems",
  initialState,
  reducers: {
    addDeductionItem(state, action) {
      const { item } = action.payload;
      state[item] = { ...state[item], display: true };
    },
    disableDeductionItem(state, action) {
      const { item } = action.payload;
      state[item] = { ...state[item], display: false };
    },
  },
});

export const { addDeductionItem, disableDeductionItem } = slice.actions;
export default slice.reducer;
