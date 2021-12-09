import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Employees from "../Employees/Employees";
import TimeCard from "../Timekeeping/TimeCard";
import Payroll from "../Payroll/Payroll";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Tab, Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [value, setValue] = useState(0);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleNavigation = (path, e) => {
    navigate(path);
    if (path === "/timekeeping") {
      setIsNavigating(true);
      setTimeout(() => {
        setIsNavigating(false);
      }, 2000);
    }
  };

  const TabPanels = (
    <>
      <Tabs
        sx={{ mt: 10, display: "flex", justifyContent: "flex-end" }}
        value={value}
        onChange={handleChange}
      >
        <Tab label="Employees" />
        <Tab label="Time Keeping" />
        <Tab label="Payroll" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <Employees />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TimeCard />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Payroll />
        </TabPanel>
      </SwipeableViews>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
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
            <ListItem
              button
              onClick={() => {
                navigate("/employees");
                handleMobileMenuClose();
              }}
              color="inherit"
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/timekeeping");
                handleMobileMenuClose();
              }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Timekeeping" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/payroll");
                handleMobileMenuClose();
              }}
            >
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
      {TabPanels}
      {isNavigating ? <LinearProgress /> : <div style={{ height: "4px" }}></div>}
    </Box>
  );
}
