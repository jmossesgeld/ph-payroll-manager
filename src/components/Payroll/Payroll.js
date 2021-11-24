import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function Payroll() {
  const employees = useSelector((state) => state.employees);
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Employees</TableCell>
            <TableCell align="right">Salary Type</TableCell>
            <TableCell align="right">Basic Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell align="right">{employee.salaryType}</TableCell>
              <TableCell align="right">{employee.salaryAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
