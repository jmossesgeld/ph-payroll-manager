import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
  },
  { field: "salaryAmount", headerName: "Amount", width: 150, align: "right", headerAlign: "right" },
];

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

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
      <Box mt={3} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">Employees List</Typography>
        <NewEmployee />
        <DataGrid rows={employees} columns={columns} autoHeight checkboxSelection />
      </Box>
    </Container>
  );
};

export default Employees;
