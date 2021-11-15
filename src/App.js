import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css'
import NavBar from "./components/Layout/NavBar";
import EmployeeTable from "./components/Employees/EmployeeTable";

const theme = createTheme({
  palette: {
    type: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <EmployeeTable />
    </ThemeProvider>
  );
}

export default App;
