import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import NavBar from "./components/Controls/NavBar";
import Employees from "./components/Employees/Employees";
import TimeCard from "./components/Timekeeping/TimeCard";
import Payroll from "./components/Payroll/Payroll";

const theme = createTheme({
  palette: {
    type: "light",
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
