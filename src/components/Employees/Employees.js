import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { getFullName } from "../../store/employees";
import NewEmployee from "./NewEmployee";

const columns = [
  { field: "fullName", headerName: "Name", width: 250, align: "right", headerAlign: "right" },
  {
    field: "salaryType",
    headerName: "Salary Type",
    width: 150,
    align: "right",
    headerAlign: "right",
    renderCell: (cell) => <Typography variant="overline">{cell.value}</Typography>,
  },
  { field: "salaryAmount", headerName: "Amount", width: 150, align: "right", headerAlign: "right" },
];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const styles = { display: "flex", flexDirection: "column", padding: 5, mt: 12 };

const Employees = () => {
  const employees = useSelector((state) => state.employees).map((employee) => {
    return {
      ...employee,
      fullName: getFullName(employee),
      salaryAmount: formatter.format(employee.salaryAmount),
    };
  });

  return (
    <Container>
      <Paper elevation={5} sx={styles}>
        <NewEmployee />
        <DataGrid rows={employees} columns={columns} autoHeight checkboxSelection />
      </Paper>
    </Container>
  );
};

export default Employees;
