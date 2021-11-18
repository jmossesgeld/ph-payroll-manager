import { Grid, List, Autocomplete, TextField, Paper, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getFullName } from "../../store/employeesSlice";
import TimeRecord from "./TimeRecord";

const paperStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "2em auto",
  maxWidth: 800,
  padding: 2,
};

export default function Timekeeping() {
  const employees = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const someList = [1, 2, 3];

  return (
    <Paper sx={paperStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={employees}
            getOptionLabel={(option) => getFullName(option)}
            id="auto-highlight"
            autoHighlight
            value={selectedEmployee}
            onChange={(e, newValue) => {
              setSelectedEmployee(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Choose Employee" variant="standard" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Choose payroll period" placement="top">
            <div>
              <TextField
                type="date"
                label="from"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="date"
                label="to"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List>
            {someList.map((item, idx) => {
              return <TimeRecord key={idx} date={item} />;
            })}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}
