import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import NewEmployee from "./NewEmployee";
import { useSelector } from "react-redux";

const columns = [
  { field: "fullName", headerName: "Name", width: 250 },
  { field: "salaryType", headerName: "Salary Type", width: 150 },
  { field: "salaryAmount", headerName: "Amount", width: 150 },
];

const EmployeeTable = () => {
  const employees = useSelector((state) => state.employees).map((employee) => {
    return {
      ...employee,
      fullName: `${employee.firstName} ${employee.middleName} ${employee.lastName} ${employee.suffix}`,
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
