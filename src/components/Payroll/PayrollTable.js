import {
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Switch,
  Tooltip,
  TextField,
} from "@mui/material";
import React from "react";

export default function PayrollTable(props) {
  const columns = [
    { field: "employeeName", headerName: "Employee", width: 300 },
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
  ];

  function renderHeader(column) {
    function clearButton(deduction, onMessage = "Disable", offMessage = "Enable") {
      const isOn = props.toggleDeductions[deduction];
      return (
        <Tooltip title={isOn ? onMessage : offMessage}>
          <Switch
            size="small"
            checked={isOn}
            onChange={() =>
              props.setToggleDeductions((prev) => {
                console.log(props.toggleDeductions);
                return { ...prev, [deduction]: !prev[deduction] };
              })
            }
          />
        </Tooltip>
      );
    }

    let toggleOptions = null;
    switch (column.field) {
      case "sssCont":
        toggleOptions = clearButton("sssCont");
        break;
      case "phicCont":
        toggleOptions = clearButton("phicCont");
        break;
      case "hdmfCont":
        toggleOptions = clearButton("hdmfCont");
        break;
      case "basicPay":
        toggleOptions = clearButton(
          "enforceDailyRate",
          "Turn off to disable forced daily rates",
          "Turn on to enforce daily rate on fixed rate employees"
        );
        break;
      default:
        toggleOptions = null;
        break;
    }

    return (
      <TableCell key={column.field} width={column.width ?? 120}>
        <div
          style={{
            display: "flex",
            justifyContent: column.field === "employeeName" ? "flex-start" : "flex-end",
            alignItems: "center",
          }}
        >
          {toggleOptions}
          <Typography variant="inherit" fontWeight="bold">
            {column.headerName}
          </Typography>
        </div>
      </TableCell>
    );
  }

  function renderCell(row, column) {
    let value = row[column.field];
    const isEmployeeName = column.field === "employeeName";

    if (!isEmployeeName) {
      value = (Math.round(Number(value) * 100) / 100)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
        })
        .slice(1);
    }

    if (column.field === "sssCont" || column.field === "phicCont" || column.field === "hdmfCont") {
      return (
        <TableCell key={column.field}>
          <TextField
            value={value}
            variant="standard"
            size="small"
            margin="none"
            inputProps={{ min: 0, style: { textAlign: "right", fontSize: 15 } }}
          />
        </TableCell>
      );
    }

    return (
      <TableCell key={column.field}>
        <Typography variant="inherit" align={isEmployeeName ? "left" : "right"}>
          {value}
        </Typography>
      </TableCell>
    );
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: "1200px" }}>
          <TableHead>
            <TableRow>{columns.map((column) => renderHeader(column))}</TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.employeeName}>
                {columns.map((column) => renderCell(row, column))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => {}}>Save</Button>
    </>
  );
}
