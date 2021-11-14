import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import NewEmployee from "./NewEmployee";
import { useSelector } from "react-redux";


const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "middleName", headerName: "Middle Name", width: 150 },
  { field: "dailyrate", headerName: "Is Daily Rate?", width: 150 },
  { field: "salary", headerName: "Salary", width: 150 },
];

const EmployeeTable = () => {
  const employees = useSelector(state=>state.employees.employees)


  return (
    <Container>
      <Box mt={3} sx={{ display: "flex", flexDirection: "column" }}>
        <NewEmployee />
        <DataGrid rows={employees} columns={columns} />
      </Box>
    </Container>
  );
};

export default EmployeeTable;
