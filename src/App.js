import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/Controls/NavBar";
import { Route, Routes } from "react-router-dom";
import Employees from "./components/Employees/Employees";
import Payroll from "./components/Payroll/Payroll";
import TimeCard from "./components/Timekeeping/TimeCard";
import TabPanels from "./components/Controls/TabPanels";
import PayrollList from "./components/Payroll/PayrollList";
import { Box } from "@mui/material";
import NavDrawer from "./components/Controls/NavDrawer";

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
  return (
    <ThemeProvider theme={theme}>
        <NavBar />
      <Box sx={{ display: "flex" }}>
        <NavDrawer />
        <Routes>
          <Route path="/" element={<TabPanels />} />
          <Route path="employees" element={<Employees />} />
          <Route path="timekeeping" element={<TimeCard />} />
          <Route path="payroll" element={<PayrollList />} />
          <Route index path="new" element={<Payroll />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
