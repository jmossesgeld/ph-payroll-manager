import { Grid, Divider, Autocomplete, TextField, Paper, Tooltip, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getFullName } from "../../store/employees";
import TimeRecord from "./TimeRecord";
import Holidays from "./Holidays";
import { Box } from "@mui/system";

const paperStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "auto",
  width: 800,
  maxWidth: "80vw",
  padding: 2,
  backgroundColor: "#FEF5ED",
  mt: 4,
};

const getDaysInBetween = (startDateInMs, endDateInMs) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const timeDifference = endDateInMs - startDateInMs;
  const daysDifference = Math.ceil(timeDifference / msPerDay);
  let dates = [];

  for (let index = 0; index < daysDifference + 1 && index < 31; index++) {
    dates.push(new Date(startDateInMs.getTime() + msPerDay * index));
  }

  return dates;
};

export default function TimeKeeping() {
  const employees = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateList = getDaysInBetween(new Date(startDate), new Date(endDate));

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
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
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
                    setEndDate(e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Holidays dateList={dateList} />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} divider={<Divider />}>
              {dateList.map((date, idx) => {
                return <TimeRecord key={idx} date={date} employeeId={selectedEmployee.id} />;
              })}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
