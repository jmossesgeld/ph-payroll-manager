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
    restDays: [0, 5, 6],
    workingHours: { from: "08:00", to: "17:00" },
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
    restDays: [0, 6],
    workingHours: { from: "07:00", to: "16:00" },
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
    restDays: [0, 6],
    workingHours: { from: "06:00", to: "15:00" },
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
