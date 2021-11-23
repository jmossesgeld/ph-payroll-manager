import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../Layout/CustomModal";
import HolidayItem from "./HolidayItem";
import { addHoliday } from "../../store/holidays";
import useDateNow from "../../hooks/useDateNow";

export default function NewHoliday(props) {
  const holidays = useSelector((state) => state.holidays);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useDateNow();
  const [description, setDescription] = useState("");
  const [holidayType, setHolidayType] = useState("regular");

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const stackStyle = {
    border: "solid",
    borderWidth: "1px",
    borderColor: "lightgray",
    mt: 2,
  };

  const holidayList = props.dateList.map((date) =>
    holidays.filter((holiday) => new Date(holiday.date).getTime() === new Date(date).getTime())
  );

  const onAddHoliday = () => {
    console.log(description.length);
    if (description.length > 1) {
      dispatch(addHoliday({ date, type: holidayType, description }));
      setDescription("");
    } else {
      alert("Please enter holiday description");
    }
  };

  return (
    <>
      <Button onClick={toggleModal} variant="outlined" color="warning">
        Holidays
      </Button>
      <CustomModal open={open} onClose={toggleModal}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <TextField
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Holiday Type</FormLabel>
              <RadioGroup
                row
                aria-label="type"
                value={holidayType}
                onChange={(event, value) => setHolidayType(value)}
                name="radio-buttons-group"
              >
                <FormControlLabel value="regular" control={<Radio />} label="Regular" />
                <FormControlLabel value="special" control={<Radio />} label="Special Non-Working" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <TextField
              label="Description"
              placeholder="ex. Christmas Day"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" color="warning" onClick={onAddHoliday}>
              Add
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider />
            <Stack divider={<Divider />} sx={stackStyle} spacing={0}>
              {holidayList.map((holidays, i) =>
                holidays.map((holiday, j) => (
                  <HolidayItem {...holiday}/>
                ))
              )}
            </Stack>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}
