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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getDaysInBetween } from "../../store/userprefs";
import { createPayroll } from "../../store/payrolls";
import { useState } from "react";
import { createRows, generatePayrollData } from "./PayrollFunctions";
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
  const dispatch = useDispatch();
  const [payrollData, setPayrollData] = useState([]);
  const employees = useSelector((state) => state.employees, shallowEqual);
  const currentPeriod = useSelector((state) => state.userprefs.currentPayrollPeriod, shallowEqual);
  const holidays = useSelector((state) => state.holidays);
  const dateList = getDaysInBetween(currentPeriod.from, currentPeriod.to).map((date) =>
    date.getTime()
  );
  const filteredTimeRecords = useSelector((state) =>
    state.timeKeeping.filter((record) => dateList.includes(record.date))
  );
  const previousPayrolls = useSelector((state) =>
    state.payrolls.filter((payroll) => {
      const prev = new Date(payroll[0]?.dateList?.at(-1) ?? 0);
      const current = new Date(currentPeriod.to);
      const a = new Date(prev.getFullYear(), prev.getMonth() + 1, 0).getTime();
      const b = new Date(current.getFullYear(), current.getMonth() + 1, 0).getTime();
      return a === b;
    })
  );

  function onGeneratePayroll() {
    const payroll = generatePayrollData(
      employees,
      dateList,
      filteredTimeRecords,
      holidays,
      dispatch
    );
    setPayrollData(payroll);

  }
  const rows = createRows(payrollData, previousPayrolls);
  console.log(rows);
  function onFinalizePayroll() {
    dispatch(createPayroll(rows));
  }

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
          <Button variant="contained" onClick={onGeneratePayroll}>
            Generate Payroll
          </Button>
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
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}
        >
          <Button variant="contained" onClick={onFinalizePayroll}>
            {"Finalize and Export"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
