import { Button, Grid, Paper } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getDaysInBetween } from "../../store/userprefs";
import { createPayroll } from "../../store/payrolls";
import { createRows, generatePayrollData } from "./PayrollFunctions";
import OtherPayrollItems from "./OtherPayrollItems";
import ChoosePeriod from "../Controls/ChoosePeriod";
import PayrollTable from "./PayrollTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  paper: {
    width: "80vw",
    margin: "auto",
    mt: 2,
    ml: 2,
    padding: 4,
  },
};

export default function Payroll() {
  const navigate = useNavigate();
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
      const prev = new Date(payroll.rows[0]?.dateList?.at(-1) ?? 0);
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
  const otherItemsData = useSelector((state) => state.userprefs.otherItemsData, shallowEqual);

  otherItemsData.forEach((item) => {
    const row = rows.find((row) => row.id === item.id);
    if (row) {
      Object.assign(row, item);
    }
  });

  rows.forEach((row) => {
    const netOtherItems = otherItemsList.reduce((prev, curr) => prev + (row[curr.name] ?? 0), 0);
    row.netPay = row.grossPay - row.sssCont - row.phicCont - row.hdmfCont - row.tax - netOtherItems;
  });

  const columns = [
    { field: "employeeName", headerName: "Employee" },
    { field: "basicPay", headerName: "Basic Pay", type: "number" },
    { field: "overtime", headerName: "Overtime", type: "number" },
    { field: "holiday", headerName: "Holiday", type: "number" },
    { field: "restDay", headerName: "Rest Day", type: "number" },
    { field: "lateUndertime", headerName: "Late / UT", type: "number" },
    { field: "absences", headerName: "Absences", type: "number" },
    { field: "grossPay", headerName: "Gross Pay", type: "number" },
    { field: "sssCont", headerName: "SSS", type: "number" },
    { field: "phicCont", headerName: "Philhealth", type: "number" },
    { field: "hdmfCont", headerName: "Pag-ibig", type: "number" },
    { field: "tax", headerName: "WTax", type: "number" },
    ...activeItems,
    { field: "netPay", headerName: "Net Pay", type: "number" },
  ];

  function onFinalizePayroll() {
    dispatch(createPayroll({ dateCreated: Date.now(), rows, columns }));
    navigate("/payroll");
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
          <OtherPayrollItems />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ height: "50vh" }}>
            {dateList.length > 0 && (
              <PayrollTable
                rows={rows}
                columns={columns}
                payrollOptions={payrollOptions}
                setPayrollOptions={setPayrollOptions}
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
