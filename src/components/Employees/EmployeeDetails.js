import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import NumberFormat from "react-number-format";
import useInput from "../../hooks/useInput";
import { addEmployee, updateEmployee } from "../../store/employees";
import CustomModal from "../Controls/CustomModal";

import {
  Button,
  TextField,
  Grid,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputAdornment,
  Typography,
  IconButton,
  Autocomplete,
  Checkbox,
  FormGroup,
} from "@mui/material";

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
});

export default function EmployeeDetails(props) {
  const dispatch = useDispatch();
  const { open, employee } = props.formState;
  const { toggle } = props.setFormState;
  const firstName = useInput(employee?.firstName, (value) => value.length > 1);
  const lastName = useInput(employee?.lastName);
  const middleName = useInput(employee?.middleName);
  const suffix = useInput(employee?.suffix);
  const address1 = useInput(employee?.address1);
  const address2 = useInput(employee?.address2);
  const [salaryType, setSalaryType] = useState(employee?.salaryType ?? "daily");
  const salaryAmount = useInput(employee?.salaryAmount, (value) => value.length > 0);
  const [restDays, setRestDays] = useState(employee?.restDays ?? [0]);
  const [workingHours, setWorkingHours] = useState(
    employee?.workingHours ?? { from: "08:00", to: "17:00" }
  );
  const [eligibilities, setEligibilities] = useState(
    employee?.eligibilities ?? { SSS: true, PHIC: true, HDMF: true }
  );

  const onSubmit = (event) => {
    if (firstName.isValid && salaryAmount.isValid) {
      if (employee) {
        dispatch(
          updateEmployee({
            ...employee,
            firstName: firstName.value,
            lastName: lastName.value,
            middleName: middleName.value,
            suffix: suffix.value,
            address1: address1.value,
            address2: address2.value,
            salaryType,
            salaryAmount: salaryAmount.value,
            restDays,
            workingHours,
            eligibilities,
          })
        );
      } else {
        dispatch(
          addEmployee({
            firstName: firstName.value,
            lastName: lastName.value,
            middleName: middleName.value,
            suffix: suffix.value,
            address1: address1.value,
            address2: address2.value,
            salaryType,
            salaryAmount: salaryAmount.value,
            restDays,
            workingHours,
            eligibilities,
          })
        );
      }
      toggle();
      clearForm();
    } else {
      alert("Please fill up required fields.\n(First Name, Salary Amount)");
    }
  };

  const clearForm = () => {
    firstName.reset();
    lastName.reset();
    middleName.reset();
    suffix.reset();
    address1.reset();
    address2.reset();
    salaryAmount.reset();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Employees List</Typography>
      </Box>
      <CustomModal open={open} onClose={toggle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 2,
            width: "100%",
          }}
        >
          <Typography variant="h5">New Employee</Typography>
          <IconButton onClick={toggle}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              autoFocus
              id="firstName"
              name="firstName"
              label="First name"
              value={firstName.value}
              onChange={firstName.valueChangeHandler}
              onBlur={firstName.inputBlurHandler}
              error={firstName.hasError}
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              value={lastName.value}
              onChange={lastName.valueChangeHandler}
              onBlur={lastName.inputBlurHandler}
              error={lastName.hasError}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="middleName"
              name="middleName"
              label="Middle name"
              value={middleName.value}
              onChange={middleName.valueChangeHandler}
              onBlur={middleName.inputBlurHandler}
              error={middleName.hasError}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="suffix"
              name="suffix"
              label="Suffix"
              value={suffix.value}
              onChange={suffix.valueChangeHandler}
              onBlur={suffix.inputBlurHandler}
              error={suffix.hasError}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              placeholder="Jr. /Sr. / III etc."
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address1"
              name="address1"
              label="Room, House No., Building, Street, Subdivision, Barangay"
              value={address1.value}
              onChange={address1.valueChangeHandler}
              onBlur={address1.inputBlurHandler}
              error={address1.hasError}
              fullWidth
              autoComplete="address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Municipality, City, Province"
              value={address2.value}
              onChange={address2.valueChangeHandler}
              onBlur={address2.inputBlurHandler}
              error={address2.hasError}
              fullWidth
              autoComplete="address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Salary Type</FormLabel>
              <RadioGroup
                row
                aria-label="rate"
                defaultValue="daily"
                value={salaryType}
                onChange={(event, value) => setSalaryType(value)}
                name="radio-buttons-group"
              >
                <FormControlLabel value="daily" control={<Radio />} label="Daily Rate" />
                <FormControlLabel value="fixed" control={<Radio />} label="Fixed Rate (Monthly)" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="salary"
              name="salary"
              label={salaryType === "daily" ? "Daily Salary" : "Monthly Salary"}
              value={salaryAmount.value}
              onChange={salaryAmount.valueChangeHandler}
              onBlur={salaryAmount.inputBlurHandler}
              error={salaryAmount.hasError}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                inputComponent: NumberFormatCustom,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              autoHighlight
              id="tags-standard"
              value={restDays}
              onChange={(e, newValue) => setRestDays(newValue)}
              options={[0, 1, 2, 3, 4, 5, 6]}
              getOptionLabel={(option) =>
                ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                  option
                ]
              }
              defaultValue={[0]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Rest Day(s)"
                  placeholder="Select multiple days if necessary..."
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
              Working Hours
            </Typography>
            <TextField
              type="time"
              label="From"
              value={workingHours.from}
              onChange={(e) => {
                setWorkingHours((prev) => {
                  return { ...prev, from: e.target.value };
                });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="time"
              label="To"
              value={workingHours.to}
              onChange={(e) => {
                setWorkingHours((prev) => {
                  return { ...prev, to: e.target.value };
                });
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Eligibility for deduction</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eligibilities.SSS}
                    onChange={() =>
                      setEligibilities((prev) => {
                        return { ...prev, SSS: !prev.SSS };
                      })
                    }
                    size="small"
                  />
                }
                label="SSS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eligibilities.PHIC}
                    onChange={() =>
                      setEligibilities((prev) => {
                        return { ...prev, PHIC: !prev.PHIC };
                      })
                    }
                    size="small"
                  />
                }
                label="Philhealth"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eligibilities.HDMF}
                    onChange={() =>
                      setEligibilities((prev) => {
                        return { ...prev, HDMF: !prev.HDMF };
                      })
                    }
                    size="small"
                  />
                }
                label="Pag-ibig"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <Button variant="contained" onClick={onSubmit} sx={{ mt: 3, ml: 1 }}>
            Add
          </Button>
        </Box>
      </CustomModal>
    </>
  );
}
