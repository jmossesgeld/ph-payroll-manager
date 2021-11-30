import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import useTimeRecord from "../../hooks/useTimeRecord";
import { getDaysInBetween } from "../../store/userprefs";
import PayrollPeriod from "../Controls/PayrollPeriod";

const styles = {
  paper: {
    width: "90vw",
    margin: "auto",
    mt: 4,
    padding: 4,
  },
};

export default function Payroll() {
  const employees = useSelector((state) => state.employees, shallowEqual);
  const currentPeriod = useSelector((state) => state.userprefs.currentPayrollPeriod, shallowEqual);
  const dateList = getDaysInBetween(currentPeriod.from, currentPeriod.to);


  return (
    <Paper elevation={5} sx={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <PayrollPeriod />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}
        >
          <Button variant="contained">Generate Payroll</Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Employees</TableCell>
                  <TableCell align="right">Salary Type</TableCell>
                  <TableCell align="right">Basic Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{employee.lastName}</TableCell>
                    <TableCell align="right">{employee.salaryType}</TableCell>
                    <TableCell align="right">{employee.salaryAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
