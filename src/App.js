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
import Welcome from "./components/Company/Welcome";
import Tutorial from "./components/Company/Tutorial";
import Footer from "./components/Company/Footer";

function App() {
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    typography: {
      fontFamily: "Segoe UI",
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#125",
            },
          }
        : {
            primary: {
              main: "#458",
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar modeState={[mode, setMode]} />
      <Box sx={{ display: "flex", m: "4rem 0" }}>
        <NavDrawer />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="employees" element={<Employees />} />
          <Route path="timekeeping" element={<TimeCard />} />
          <Route path="payroll" element={<PayrollList />} />
          <Route index path="new" element={<Payroll />} />
        </Routes>
        <Footer/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
