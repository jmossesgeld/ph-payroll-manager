import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Logo from "../Icons/logo.png";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={Logo}
            alt="mage-logo"
            style={{ height: "50px", width: "50px", marginRight: "2rem" }}
          />
          <Typography
            variant="h6"
            color="#630000"
            sx={{ flexGrow: 1, fontFamily: "segoe ui", letterSpacing: "3px" }}
          >
            MAGE Payroll System
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit">Employees</Button>
            <Button color="inherit">Timekeeping</Button>
            <Button color="inherit">Payroll</Button>
          </Box>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ ml: 2, display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
