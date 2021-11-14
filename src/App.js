import "./App.css";
import NavBar from "./components/Layout/NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "rgb(220, 0, 78)",
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
    </ThemeProvider>
  );
}

export default App;
