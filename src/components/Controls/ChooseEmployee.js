import { useSelector, useDispatch } from "react-redux";
import { getFullName } from "../../store/employees";
import { Autocomplete, TextField } from "@mui/material";
import { setSelectedEmployee } from "../../store/userprefs";
import { useEffect } from "react";

export default function ChooseEmployee(props) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const selectedEmployee = useSelector((state) => state.userprefs.selectedEmployee);

  useEffect(() => {
    dispatch(setSelectedEmployee(employees[0]));
  }, [employees, dispatch]);

  return (
    <Autocomplete
      options={employees}
      getOptionLabel={(option) => getFullName(option)}
      id="auto-highlight"
      autoHighlight
      value={selectedEmployee}
      onChange={(e, newValue) => {
        if (newValue) {
          dispatch(setSelectedEmployee(newValue));
        }
        if (props.onChange) {
          props.onChange();
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label="Employee" variant="standard" />}
    />
  );
}
