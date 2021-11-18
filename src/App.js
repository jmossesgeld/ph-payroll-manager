import "./App.css";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/Layout/NavBar";
import EmployeeTable from "./components/Employees/EmployeeTable";
import { Route, Routes } from "react-router";
import Timekeeping from "./components/Timekeeping/Timekeeping";

const theme = createTheme({
  palette: {
    type: "light",
  },
});

function App() {
  useEffect(() => {
    window.onbeforeunload = () => true;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/employees" element={<EmployeeTable />} />
        <Route path="/timekeeping" element={<Timekeeping />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
