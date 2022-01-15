import { Button, Grid, Paper } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getDaysInBetween } from "../../store/userprefs";
import { createPayroll } from "../../store/payrolls";
import { createRows, generatePayrollData } from "./PayrollFunctions";
import OtherPayrollItems from "./OtherPayrollItems";
import ChoosePeriod from "../Controls/ChoosePeriod";
import PayrollTable from "./PayrollTable";
import { useState } from "react";

const styles = {
  paper: {
    width: "90vw",
    margin: "auto",
    mt: 2,
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

  const [payrollOptions, setPayrollOptions] = useState({
    sssCont: true,
    phicCont: true,
    hdmfCont: true,
    enforceDailyRate: false,
    tax: true,
  });

  const payrollData = generatePayrollData(
    employees,
    dateList,
    filteredTimeRecords,
    holidays,
    dispatch
  );
  const rows = createRows(payrollData, previousPayrolls, payrollOptions);

  const otherItemsList = useSelector((state) => state.otherpayrollitems);
  const activeItems = otherItemsList
    .filter((item) => item.isActive)
    .map((item) => ({
      field: item.name,
      headerName: item.header,
      type: "number",
    }));
  const otherItemsData = useSelector((state) => state.userprefs.otherItemsData);

  otherItemsData.forEach((item) => {
    const row = rows.find((row) => row.id === item.id);
    if (row) {
      Object.assign(row, item);
    }
  });

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
          <Button variant="contained" onClick={() => console.log(rows)} sx={{ mr: 2 }}>
            Check Values
          </Button>
          <OtherPayrollItems/>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ height: "50vh" }}>
            {dateList.length > 0 && (
              <PayrollTable
                rows={rows}
                payrollOptions={payrollOptions}
                setPayrollOptions={setPayrollOptions}
                otherItemsList={activeItems}
              />
            )}
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
