import {
  Divider,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const H2 = ({ children }) => (
  <Typography variant="h2" mt={4}>
    {children}
  </Typography>
);

const Body = ({ children }) => (
  <Typography variant="body1" mt={4}>
    {children}
  </Typography>
);

const Img = ({ src, ...rest }) => (
  <img src={"/tutorial/" + src} alt={src} {...rest} style={{ margin: "1rem 0" }} />
);

export default function Tutorial() {
  const navigate = useNavigate();

  const ListOfSteps = (
    <List>
      <ListItem button onClick={() => navigate("employees")}>
        <ListItemIcon>
          <AccessibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Employee Management" />
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
        <ListItemText primary="Payroll Generation" />
      </ListItem>
    </List>
  );

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "2rem 5vw",
        width: "80vw",
        maxWidth: "1000px",
        padding: 10,
      }}
      variant="outlined"
    >
      <Typography variant="h6">
        Preparing payroll has never been simple. It only includes 3 easy steps:
      </Typography>
      {ListOfSteps}
      <Divider />
      <H2>Step 1: Employees</H2>
      <Typography variant="button" color="#b00" mt={4}>
        If you have already updated the Employees information, skip this step.
      </Typography>
      <Body>
        In this section you can add a new employee by clicking the "Add New Employee" button. You
        can also edit an existing employee by clicking the "Edit" button and you can delete an
        employee by clicking the "Delete" button.
      </Body>
      <Img src="employeeSection.png" height={677} width={856} />
      <Body>
        In order to create an employee, you must fill out the following fields. Please take note
        that only the first name and salary are required. However, details such as working hours,
        rest days and eligibility for deduction will affect timekeeping and computation of payroll.
        All other fields such as address and middle name are optional.
      </Body>
      <Img src="employeeForm.png" height={822} width={567} />
      <H2>Step 2: Timekeeping</H2>
      <Body>
        In this section, you can edit the timekeeping information of an employee such as time in,
        time out, abscences, etc.
      </Body>
      <Body>
        In order to configure timekeeping, you must first select the employee and the date. Then,
        you can click on the "Generate Time Card" button.
      </Body>
      <Img src="createTimeCard.png" height={215} width={792} />
      <Body>
        Tardiness, overtime and undertime are automatically computed based on the time-in and
        time-out so there is no need to compute manually.
      </Body>
      <Img src="timeCard.png" height={792} width={794} />
      <Body>You can also configure the holiday schedule. This applies to all employees.</Body>
      <Img src="holidays.png" width={592} height={611} />
      <Body>
        Holiday settings are automaticaly reflected in the time card of the employee. If the
        employee decides to work on a holiday, additional pay is automatically computed in the
        payroll.
      </Body>
      <Img src="timeCardHoliday.png" width={793} height={761} />
      <H2>Step 3: Payroll</H2>
      <Body>
        In this section, you can see all the previous payroll generated. If there is no payroll
        created yet, you can create one by clicking the "Create New Payroll" button.
      </Body>
      <Img src="payrollList.png" width={796} height={223} />
    </Paper>
  );
}
