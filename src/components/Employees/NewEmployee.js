import { useState, forwardRef } from "react";
import NumberFormat from "react-number-format";
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
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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
      isNumericString
    />
  );
});

export default function NewEmployee() {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        color="secondary"
        sx={{ alignSelf: "flex-end" }}
      >
        Add New Employee
      </Button>
      <Modal open={open} onClose={handleClick}>
        <Box sx={style}>
          <Typography variant="h6">New Employee</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
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
                fullWidth
                autoComplete="address-line2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Salary Type</FormLabel>
                <RadioGroup row aria-label="rate" defaultValue="daily" name="radio-buttons-group">
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
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", width:"100%" }}>
            <Button variant="contained" onClick={() => {}} sx={{ mt: 3, ml: 1 }}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
