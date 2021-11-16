import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import NavBar from "./components/Layout/NavBar";
import EmployeeTable from "./components/Employees/EmployeeTable";
import { Container } from "@mui/material";

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
        <EmployeeTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;
