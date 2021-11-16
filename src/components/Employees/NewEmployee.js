import { useState, forwardRef } from "react";
import NumberFormat from "react-number-format";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { addEmployees } from "../../store/employeesSlice";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  TextField,
  Modal,
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
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "90vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "& input": { margin: "2px" },
  display: "flex",
  flexWrap: "wrap",
};

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

export default function NewEmployee() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const [open, setOpen] = useState(false);
  const [salaryType, setSalaryType] = useState("daily");
  const firstName = useInput((value) => value.length > 4);
  const lastName = useInput();
  const middleName = useInput();
  const suffix = useInput();
  const address1 = useInput();
  const address2 = useInput();
  const salaryAmount = useInput((value) => value.length > 0);

  const onSubmit = (event) => {
    if (firstName.isValid && salaryAmount.isValid) {
      dispatch(
        addEmployees({
          id: employees[employees.length - 1].id + 1,
          firstName: firstName.value,
          lastName: lastName.value,
          middleName: middleName.value,
          suffix: suffix.value,
          address1: address1.value,
          address2: address2.value,
          salaryType,
          salaryAmount: salaryAmount.value,
        })
      );
      toggleModal();
      clearForm();
    } else {
      alert("Please fill up required fields.\n(First Name, Salary Amount)");
    }
  };

  const onKeyDown = (event) => {
    // if (event.key === "Enter") {
    //   handleSubmit(event);
    // } else if (event.key === "Esc") {
    //   clearForm();
    // }
  };

  const toggleModal = (event) => {
    setOpen((prev) => !prev);
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
      <Button
        onClick={toggleModal}
        variant="contained"
        color="secondary"
        sx={{ alignSelf: "flex-end", mb: 1 }}
      >
        Add New Employee
      </Button>
      <Modal open={open} onClose={toggleModal}>
        <Box sx={style} onKeyDown={onKeyDown}>
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
            <IconButton onClick={toggleModal}>
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
                  <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                  <FormControlLabel value="fixed" control={<Radio />} label="Monthly (Fixed)" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="salary"
                name="salary"
                label="Salary Amount"
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
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <Button variant="contained" onClick={onSubmit} sx={{ mt: 3, ml: 1 }}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
