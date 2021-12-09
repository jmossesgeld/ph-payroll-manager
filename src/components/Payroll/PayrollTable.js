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
} from "@mui/material";
import React from "react";

function PayrollTable(props) {
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

  function renderColumn(column) {
    const clearButton = (deduction) => (
      <Switch
        size="small"
        checked={props.toggleDeductions[deduction]}
        onChange={() =>
          props.setToggleDeductions((prev) => {
            console.log(props.toggleDeductions);
            return { ...prev, [deduction]: !prev[deduction] };
          })
        }
      />
    );

    console.log(column);

    const clearDeductions =
      column.field === "sssCont"
        ? clearButton("sssCont")
        : column.field === "phicCont"
        ? clearButton("phicCont")
        : column.field === "hdmfCont"
        ? clearButton("hdmfCont")
        : null;

    return (
      <TableCell key={column.field} width={column.width ?? 120}>
        <div
          style={{
            display: "flex",
            justifyContent: column.field === "employeeName" ? "flex-start" : "flex-end",
            alignItems: "center",
          }}
        >
          {clearDeductions}
          <Typography variant="inherit" fontWeight="bold">
            {column.headerName}
          </Typography>
        </div>
      </TableCell>
    );
  }

  function renderRow(row, column) {
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

    return (
      <TableCell key={column.field}>
        <Typography variant="inherit" align={isEmployeeName ? "left" : "right"}>
          {value}
        </Typography>
      </TableCell>
    );
  }

  // function deepMergeObjects(obj1, obj2) {
  //   const obj3 = { ...obj1 };
  //   for (const prop in obj2) {
  //     if (obj2.hasOwnProperty(prop)) {
  //       if (typeof obj2[prop] === "object") {
  //         if (Object.keys(obj2[prop])[0] === "value") {
  //           obj3[prop] = obj2[prop].value;
  //         } else {
  //           obj3[prop] = deepMergeObjects(obj1[prop] ?? {}, obj2[prop]);
  //         }
  //       } else {
  //         obj3[prop] = obj2[prop];
  //       }
  //     }
  //   }
  //   return obj3;
  // }
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: "1200px" }}>
          <TableHead>
            <TableRow>{columns.map((column) => renderColumn(column))}</TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.employeeName}>
                {columns.map((column) => renderRow(row, column))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => {}}>Save</Button>
    </>
  );
}

export default PayrollTable;
