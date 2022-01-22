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
} from "@mui/material";

export default function PayrollTable(props) {
  const rows = props.rows ?? [];
  const columns = props.columns;

  function renderHeader(column) {
    function clearButton(
      deduction,
      onMessage = "Defer the deduction to the next payroll within the same month",
      offMessage = "Enable"
    ) {
      const isOn = props.payrollOptions[deduction];
      return (
        <Tooltip title={isOn ? onMessage : offMessage}>
          <Switch
            size="small"
            checked={isOn}
            onChange={() =>
              props.setPayrollOptions((prev) => {
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
      <TableCell key={column.field}>
        <div
          style={{
            display: "flex",
            justifyContent: column.field === "employeeName" ? "flex-start" : "flex-end",
            textAlign: column.field === "employeeName" ? "left" : "right",
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
    let value = row[column.field] ?? 0;
    const isEmployeeName = column.field === "employeeName";

    if (!isEmployeeName) {
      value = (Math.round(Number(value) * 100) / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
      });
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
        <Table sx={{ width: columns.length * 120 }}>
          <TableHead>
            <TableRow>{columns.map((column) => renderHeader(column))}</TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
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
