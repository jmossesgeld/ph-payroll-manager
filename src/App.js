import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import NavBar from "./components/Layout/NavBar";
import EmployeeTable from "./components/Employees/EmployeeTable";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router";
import Timekeeping from "./components/Timekeeping/Timekeeping";

const theme = createTheme({
  palette: {
    type: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container component="main">
        <Routes>
          <Route path="/employees" element={<EmployeeTable />} />
          <Route path="/timekeeping" element={<Timekeeping />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
