import { Container, Paper, Typography, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../store/employees";
import EmployeeDetails from "./EmployeeForm";
import { Box } from "@mui/system";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const styles = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FBF8F1",
  padding: 5,
  mt: 5,
};

const Employees = () => {
  const [formState, setFormState] = useState({ open: false, employee: null });
  const controlForm = {
    toggle: () =>
      setFormState((prev) => {
        return { ...prev, open: !prev.open };
      }),
    newEmployee: () => setFormState({ open: true, employee: null }),
    editEmployee: (employee) => setFormState({ open: true, employee }),
  };

  const rows = useSelector((state) => state.employees).map((employee) => {
    return {
      ...employee,
      fullName: getFullName(employee),
      salaryAmount: formatter.format(employee.salaryAmount),
    };
  });

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
    {
      field: "salaryAmount",
      headerName: "Amount",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      align: "right",
      headerAlign: "right",
      renderCell: (cell) => (
        <IconButton onClick={controlForm.editEmployee.bind(null, cell.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container>
      <Paper elevation={5} sx={styles}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Employees</Typography>
          <Button onClick={controlForm.newEmployee} variant="contained" color="success">
            + New Employee
          </Button>
        </Box>
        {formState.open && <EmployeeDetails formState={formState} setFormState={controlForm} />}
        <DataGrid rows={rows} columns={columns} autoHeight checkboxSelection />
      </Paper>
    </Container>
  );
};

export default Employees;
