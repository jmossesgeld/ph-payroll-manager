import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/Controls/NavBar";
import { Route, Routes } from "react-router-dom";
import Employees from "./components/Employees/Employees";
import Payroll from "./components/Payroll/Payroll";
import TimeCard from "./components/Timekeeping/TimeCard";
import PayrollList from "./components/Payroll/PayrollList";
import { Box, CssBaseline } from "@mui/material";
import NavDrawer from "./components/Controls/NavDrawer";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#1e1f20",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar modeState={[mode, setMode]} />
      <Box sx={{ display: "flex", m: "4rem 0" }}>
        <NavDrawer />
        <Routes>
          <Route path="/" element={<Employees />} />
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
