import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactUs from "../Company/ContactUs";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      height: "100%",
      zIndex: 0,
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

export default function NavDrawer() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate("employees")}>
          <ListItemIcon>
            <AccessibilityIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button onClick={() => navigate("timekeeping")}>
          <ListItemIcon>
            <AccessAlarmsIcon />
          </ListItemIcon>
          <ListItemText primary="Timekeeping" />
        </ListItem>
        <ListItem button onClick={() => navigate("payroll")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Payroll" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button  onClick={() => navigate("/tutorial")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Tutorial" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ContactUs />
      </List>
      <Divider />
    </StyledDrawer>
  );
}
