import {
  Grid,
  Divider,
  Autocomplete,
  TextField,
  Paper,
  Stack,
  Button,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import React, { useState, Suspense, useCallback, useMemo } from "react";
import { getFullName } from "../../store/employees";
import { getDaysInBetween } from "../../store/userprefs";
import Holidays from "./Holidays";
import ChoosePeriod from "../Controls/ChoosePeriod";

const paperStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "auto",
  width: 800,
  maxWidth: "80vw",
  padding: 2,
  // backgroundColor: "#FEF5ED",
  mt: 2,
};

export default function TimeKeeping() {
  const employees = useSelector((state) => state.employees);
  const current = useSelector((state) => state.userprefs.currentPayrollPeriod);
  const dateList = useMemo(() => getDaysInBetween(current.from, current.to), [current]);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [timeRecords, setTimeRecords] = useState("");
  const TimeRecord = React.lazy(() => import("./TimeRecord"));

  const generateTimeRecords = useCallback(() => {
    setTimeout(() => {
      setTimeRecords(
        <Stack spacing={1} divider={<Divider />}>
          {dateList.map((date) => {
            return (
              <Suspense
                key={date}
                fallback={
                  <Skeleton sx={{ bgcolor: "grey.100" }} variant="rectangular" height={120} />
                }
              >
                <TimeRecord
                  key={date.toString().concat(selectedEmployee.id)}
                  date={date.getTime()}
                  employee={selectedEmployee}
                />
              </Suspense>
            );
          })}
        </Stack>
      );
    }, 0);
  }, [dateList, selectedEmployee]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "auto" }}>
      <Paper sx={paperStyle} elevation={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5}>
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
          <Grid item xs={12} sm={12} md={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ChoosePeriod />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Holidays dateList={dateList} />
            <Button variant="contained"  onClick={generateTimeRecords}>
              Generate Time Card
            </Button>
          </Grid>
          <Grid item xs={12}>
            {timeRecords}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
