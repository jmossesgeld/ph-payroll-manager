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
import { getDaysInBetween, getTimeDifference } from "../../store/userprefs";
import PayrollPeriod from "../Controls/PayrollPeriod";
import { createRecord } from "../../store/timerecords";
import { useState } from "react";
import { getFullName } from "../../store/employees";
import {
  computeHDMFContribution,
  computePHICContribution,
  computeSSSContribution,
} from "./Contributions";

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
  const employees = useSelector((state) => state.employees, shallowEqual);
  const currentPeriod = useSelector((state) => state.userprefs.currentPayrollPeriod, shallowEqual);
  const dateList = getDaysInBetween(currentPeriod.from, currentPeriod.to).map((date) =>
    date.getTime()
  );
  const filteredTimeRecords = useSelector((state) =>
    state.timeKeeping.filter((record) => dateList.includes(record.date))
  );
  const holidays = useSelector((state) => state.holidays);
  const [payrollData, setPayrollData] = useState([]);

  const getGrossModifiers = (timeRecords) => {
    return timeRecords.reduce(
      (prev, current) => {
        const hours =
          parseFloat(getTimeDifference(current.timeOut, current.timeIn)) > 0
            ? 8 - current.late - Math.min(current.overtime, 0)
            : 0;
        const regularHolidays = current.holidays.filter(
          (holiday) => holiday.type === "regular"
        ).length; //determine no. of regular holidays
        const specialHolidays = current.holidays.filter(
          (holiday) => holiday.type === "special"
        ).length; //determine no. of special holidays
        let multiplier = 1;
        if (current.isRestDay) {
          if (specialHolidays) {
            multiplier = 1.5;
          } else if (regularHolidays) {
            multiplier = 2.6;
          } else {
            multiplier = 1.3;
          }
        } else if (specialHolidays) {
          multiplier = 1.3;
        } else if (regularHolidays) {
          multiplier = 1 + regularHolidays;
        }
        return {
          normalDaysWorked:
            prev.normalDaysWorked +
            (!current.isRestDay && !specialHolidays && !regularHolidays ? 1 : 0),
          overtime: prev.overtime + Math.max(current.overtime, 0) * multiplier * 1.25,
          undertime: prev.undertime + Math.min(current.overtime, 0) * multiplier,
          regularHoliday: prev.regularHoliday + (regularHolidays ? multiplier : 0) * hours,
          specialHoliday: prev.specialHoliday + (specialHolidays ? multiplier : 0) * hours,
          restDay:
            prev.restDay +
            (current.isRestDay && specialHolidays === 0 && regularHolidays === 0 ? multiplier : 0) *
              hours,
          late: prev.late + current.late * multiplier,
          absences: prev.absences + (current.isAbsent ? 8 : 0),
        }; //grossModifier object to be passed to next record
      },
      {
        normalDaysWorked: 0,
        overtime: 0,
        undertime: 0,
        regularHoliday: 0,
        specialHoliday: 0,
        restDay: 0,
        late: 0,
        absences: 0,
      } //initial value of reduce
    );
  };

  const rows = payrollData.map((data) => {
    if (data.employee.salaryType === "daily") {
      const rate = data.employee.salaryAmount / 8;
      const modifiers = data.grossModifiers;
      const employeeName = getFullName(data.employee);
      const basicPay = rate * modifiers.normalDaysWorked * 8;
      const overtime = rate * modifiers.overtime;
      const holiday = rate * (modifiers.regularHoliday + modifiers.specialHoliday);
      const restDay = rate * modifiers.restDay;
      const lateUndertime = rate * (modifiers.late + modifiers.undertime);
      const absences = rate * modifiers.absences;
      const grossPay = basicPay + overtime + holiday + restDay - lateUndertime - absences;
      const sssCont = computeSSSContribution(grossPay).EE;
      const phicCont = computePHICContribution(data.employee);
      const hdmfCont = computeHDMFContribution(grossPay).EE;
      return {
        employeeName,
        basicPay,
        overtime,
        holiday,
        restDay,
        lateUndertime,
        absences,
        grossPay,
        sssCont,
        phicCont,
        hdmfCont,
      };
    } else {
      return {};
    }
  });
  console.log(rows);

  const onGeneratePayroll = () => {
    const payroll = employees.map((employee) => {
      const timeRecords = dateList.map((date) => {
        const record = filteredTimeRecords.find(
          (record) => record.date === date && record.employeeId === employee.id
        );
        if (!record) {
          const listOfHolidays = holidays.filter(
            (holiday) => new Date(holiday.date).getTime() === date
          );
          const isRestDay = Boolean(
            employee.restDays.filter((day) => day === new Date(date).getDay()).length
          );
          const newRecord = {
            employeeId: employee.id,
            date,
            timeIn: isRestDay || listOfHolidays.length ? "" : employee.workingHours.from,
            timeOut: isRestDay || listOfHolidays.length ? "" : employee.workingHours.to,
            overtime: 0.0,
            late: 0.0,
            isRestDay,
            holidays: listOfHolidays,
          };
          dispatch(createRecord(newRecord));
          return newRecord;
        } else {
          return record;
        }
      });
      const grossModifiers = getGrossModifiers(timeRecords);
      return {
        employee,
        timeRecords,
        grossModifiers,
      };
    });
    setPayrollData(payroll);
  };

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
      </Grid>
    </Paper>
  );
}
