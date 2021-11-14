import "./App.css";
import NavBar from "./components/Layout/NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmployeeTable from "./components/Employees/EmployeeTable";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#EEEBDD",
    },
    secondary: {
      main: "#D8B6A4",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <EmployeeTable/>
    </ThemeProvider>
  );
}

export default App;
