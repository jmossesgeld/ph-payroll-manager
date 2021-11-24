import {
  Grid,
  Divider,
  Autocomplete,
  TextField,
  Paper,
  Tooltip,
  Stack,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getFullName } from "../../store/employees";
import { getDaysInBetween, setPayrollPeriodFrom, setPayrollPeriodTo } from "../../store/userprefs";
import TimeRecord from "./TimeRecord";
import Holidays from "./Holidays";

const paperStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "auto",
  width: 800,
  maxWidth: "80vw",
  padding: 2,
  // backgroundColor: "#FEF5ED",
  mt: 4,
};

export default function TimeKeeping() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const startDate = useSelector((state) => state.userprefs.currentPayrollPeriod.from);
  const endDate = useSelector((state) => state.userprefs.currentPayrollPeriod.to);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const dateList = getDaysInBetween(startDate, endDate);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "auto" }}>
      <Paper sx={paperStyle} elevation={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Autocomplete
              options={employees}
              getOptionLabel={(option) => getFullName(option)}
              id="auto-highlight"
              autoHighlight
              value={selectedEmployee}
              onChange={(e, newValue) => {
                setSelectedEmployee(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Choose Employee" variant="standard" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Tooltip title="Choose payroll period" placement="top">
              <div>
                <TextField
                  type="date"
                  label="from"
                  helperText="Covered Period"
                  value={startDate}
                  onChange={(e) => {
                    dispatch(setPayrollPeriodFrom(e.target.value));
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  type="date"
                  label="to"
                  value={endDate}
                  onChange={(e) => {
                    dispatch(setPayrollPeriodTo(e.target.value));
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Holidays dateList={dateList} />
            <Button variant="contained" color="success">
              Generate Individual Salary
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} divider={<Divider />}>
              {dateList.map((date, idx) => {
                return <TimeRecord key={idx} date={date} employee={selectedEmployee} />;
              })}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
