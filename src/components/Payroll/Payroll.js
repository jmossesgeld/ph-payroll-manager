import { Button, Grid, Paper } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getDaysInBetween } from "../../store/userprefs";
import { createPayroll } from "../../store/payrolls";
import { createRows, generatePayrollData } from "./PayrollFunctions";
import ChoosePeriod from "../Controls/ChoosePeriod";
import PayrollTable from "./PayrollTable";

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

  const payroll = generatePayrollData(employees, dateList, filteredTimeRecords, holidays, dispatch);

  let rows = createRows(payroll, previousPayrolls);

  function onFinalizePayroll() {
    dispatch(createPayroll(rows));
  }

  return (
    <Paper elevation={5} sx={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ChoosePeriod />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}
        >
          <Button variant="contained" onClick={() => {}} sx={{ mr: 2 }}>
            Generate Payroll
          </Button>
          <Button variant="contained" onClick={() => console.log(rows)}>
            Check Values
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ height: "50vh" }}>
            <PayrollTable rows={rows} />
          </Paper>
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
