import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/Layout/NavBar";
import Employees from "./components/Employees/Employees";
import { Route, Routes } from "react-router";
import TimeKeeping from "./components/Timekeeping/TimeKeeping";

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
        <Route path="/timekeeping" element={<TimeKeeping />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
