import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    firstName: "Juan",
    lastName: "",
    middleName: "",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "daily",
    salaryAmount: 500,
    restDays: [0],
    workingHours: { from: "08:00", to: "17:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: true },
  },
  {
    id: 1,
    firstName: "Pedro",
    lastName: "",
    middleName: "",
    suffix: "Sr.",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "daily",
    salaryAmount: 650,
    restDays: [0, 6],
    workingHours: { from: "07:00", to: "16:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: true },
  },
  {
    id: 2,
    firstName: "Diego",
    lastName: "",
    middleName: "",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "fixed",
    salaryAmount: 19650,
    restDays: [0, 6],
    workingHours: { from: "06:00", to: "15:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: false },
  },
  {
    id: 3,
    firstName: "Pablo",
    lastName: "",
    middleName: "",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "fixed",
    salaryAmount: 25331,
    restDays: [0, 6],
    workingHours: { from: "06:00", to: "15:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: false },
  },
  {
    id: 4,
    firstName: "Jose",
    lastName: "",
    middleName: "",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "fixed",
    salaryAmount: 31442,
    restDays: [0, 6],
    workingHours: { from: "06:00", to: "15:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: false },
  },
  {
    id: 5,
    firstName: "Ferdinand",
    lastName: "",
    middleName: "",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "daily",
    salaryAmount: 1694,
    restDays: [0, 6],
    workingHours: { from: "06:00", to: "15:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: false },
  },
  {
    id: 6,
    firstName: "Richard",
    lastName: "",
    middleName: "",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "daily",
    salaryAmount: 2141,
    restDays: [0, 6],
    workingHours: { from: "06:00", to: "15:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: false },
  },
  {
    id: 7,
    firstName: "Victor",
    lastName: "",
    middleName: "",
    suffix: "",
    address1: "Brgy. Sto. Nino",
    address2: "Calumpit, Bulacan",
    salaryType: "daily",
    salaryAmount: 2141,
    restDays: [0, 6],
    workingHours: { from: "06:00", to: "15:00" },
    eligibilities: { SSS: true, PHIC: true, HDMF: false },
  },
];

const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = action.payload;
      newEmployee.id = `${new Date().getTime().toString()}no${state.length.toString()}`;
      state.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const { id, ...rest } = action.payload;
      const employee = state.find((employee) => employee.id === id);
      Object.assign(employee, rest);
    },
    deleteEmployee: (state, action) => {
      console.log(action.payload);
      const { id } = action.payload;
      const employeeIndex = state.findIndex((employee) => employee.id === id);
      state.splice(employeeIndex, 1);
    },
  },
});

export function getFullName(employee) {
  return `${employee.firstName} ${employee.middleName} ${employee.lastName} ${employee.suffix}`;
}

export const { addEmployee, updateEmployee, deleteEmployee } = slice.actions;
export default slice.reducer;
