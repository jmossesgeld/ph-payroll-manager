import { Grid, Divider, Paper, Stack, Button, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import React, { useState, Suspense, useCallback, useMemo } from "react";
import { getDaysInBetween } from "../../store/userprefs";
import Holidays from "./Holidays";
import ChoosePeriod from "../Controls/ChoosePeriod";
import ChooseEmployee from "../Controls/ChooseEmployee";

const paperStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  maxWidth: "800px",
  margin: "3rem 0",
  padding: 5,
};

export default function TimeKeeping() {
  const current = useSelector((state) => state.userprefs.currentPayrollPeriod);
  const dateList = useMemo(() => getDaysInBetween(current.from, current.to), [current]);
  const selectedEmployee = useSelector((state) => state.userprefs.selectedEmployee);
  const [timeRecords, setTimeRecords] = useState("");
  const TimeRecord = React.lazy(() => import("./TimeRecord"));

  const generateTimeRecords = useCallback(() => {
    if (dateList.length > 0) {
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
    } else {
      alert("No dates selected");
    }
  }, [dateList, selectedEmployee]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "auto" }}>
      <Paper sx={paperStyle} elevation={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5}>
            <ChooseEmployee onChange={() => setTimeRecords("")} />
          </Grid>
          <Grid item xs={12} sm={12} md={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ChoosePeriod onChange={() => setTimeRecords("")} />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Holidays dateList={dateList} />
            <Button variant="contained" onClick={generateTimeRecords}>
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
