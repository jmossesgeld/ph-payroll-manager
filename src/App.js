import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import NavBar from "./components/Controls/NavBar";
import Employees from "./components/Employees/Employees";
import TimeCard from "./components/Timekeeping/TimeCard";
import Payroll from "./components/Payroll/Payroll";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  // useEffect(() => {
  //   window.onbeforeunload = () => true;
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/timekeeping" element={<TimeCard />} />
        <Route path="/payroll" element={<Payroll />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
