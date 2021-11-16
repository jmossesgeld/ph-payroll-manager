import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useState } from "react";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ ml: 2, display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>User Preferences</MenuItem>
        <MenuItem onClick={handleMenuClose}>About Us</MenuItem>
      </Menu>
      <Drawer anchor="right" open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button color="inherit">
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Timekeeping" />
            </ListItem>
            <ListItem button>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Payroll" />
            </ListItem>
            <Divider />
            <ListItem
              button
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
