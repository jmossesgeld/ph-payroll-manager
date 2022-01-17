import { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab, Box } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import Employees from "../Employees/Employees";
import TimeCard from "../Timekeeping/TimeCard";
import PayrollList from "../Payroll/PayrollList";

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

export default function TabPanels() {
  const [value, setValue] = useState(0);
  const animateTransitions = useSelector((state) => state.animateTransitions);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        sx={{ display: "flex", justifyContent: "flex-end" }}
        value={value}
        onChange={handleChange}
      >
        <Tab label="Employees" />
        <Tab label="Time Keeping" />
        <Tab label="Payroll" />
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
        animateTransitions={animateTransitions}
      >
        <TabPanel value={value} index={0}>
          <Employees />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TimeCard />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PayrollList />
        </TabPanel>
      </SwipeableViews>
    </>
  );
}
