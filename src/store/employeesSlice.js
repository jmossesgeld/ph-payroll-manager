import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleName: "Antonio",
    suffix: "Jr.",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "daily",
    salaryAmount: 500,
  },
  {
    id: 1,
    firstName: "Pedro",
    lastName: "Penduko",
    middleName: "Santos",
    suffix: "X",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "daily",
    salaryAmount: 650,
  },
  {
    id: 2,
    firstName: "Diego",
    lastName: "Aguinaldo",
    middleName: "Manalo",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "fixed",
    salaryAmount: 19650,
  },
];

const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployees: (state, action) => {
      state.push(action.payload);
    },
  },
});

export function getFullName(employee) {
  return `${employee.firstName} ${employee.middleName} ${employee.lastName} ${employee.suffix}`;
}

export const { addEmployees } = slice.actions;
export default slice.reducer;
