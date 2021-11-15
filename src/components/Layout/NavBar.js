import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="#fff"
            mr={2}
            sx={{ fontFamily: "segoe ui", letterSpacing: "1px", fontWeight: "600" }}
          >
            MAGE
          </Typography>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontFamily: "segoe ui", letterSpacing: "4px", fontWeight: "300" }}
          >
            Payroll System
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
