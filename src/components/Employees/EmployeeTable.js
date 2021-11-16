import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import NewEmployee from "./NewEmployee";
import { useSelector } from "react-redux";

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

const EmployeeTable = () => {
  const employees = useSelector((state) => state.employees).map((employee) => {
    return {
      ...employee,
      fullName: `${employee.firstName} ${employee.middleName} ${employee.lastName} ${employee.suffix}`,
      salaryAmount: formatter.format(employee.salaryAmount),
    };
  });
  console.log(employees);

  return (
    <Container>
      <Box mt={3} sx={{ display: "flex", flexDirection: "column" }}>
        <NewEmployee />
        <DataGrid rows={employees} columns={columns} autoHeight checkboxSelection />
      </Box>
    </Container>
  );
};

export default EmployeeTable;
