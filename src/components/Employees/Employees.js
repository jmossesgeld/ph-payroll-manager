import { Container, Paper, Typography, IconButton, Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFullName, deleteEmployee } from "../../store/employees";
import EmployeeForm from "./EmployeeForm";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const styles = {
  display: "flex",
  flexDirection: "column",
  padding: 5,
  width: "100%",
  maxWidth: "840px",
  margin: "3rem 0",
};

const Employees = () => {
  const dispatch = useDispatch();
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
      width: 70,
      align: "right",
      headerAlign: "right",
      renderCell: (cell) => (
        <IconButton onClick={controlForm.editEmployee.bind(null, cell.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      align: "right",
      headerAlign: "right",
      renderCell: (cell) => (
        <IconButton
          onClick={() => {
            dispatch(deleteEmployee(cell.row));
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", flexDirection: { xs: "column", md: "row" } }}
    >
      <Paper elevation={5} sx={styles}>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h5" mb={2}>Employees</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
            <Button onClick={controlForm.newEmployee} variant="contained">
              Add New Employee
            </Button>
          </Grid>
        </Grid>
        {formState.open && <EmployeeForm formState={formState} setFormState={controlForm} />}
        <DataGrid rows={rows} columns={columns} autoHeight />
      </Paper>
    </Container>
  );
};

export default Employees;
