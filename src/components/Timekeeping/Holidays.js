import {
  Button,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import CustomModal from "../Layout/CustomModal";
import useDateNow from "../../hooks/useDateNow";
import HolidayItem from "./HolidayItem";
import { addHoliday } from "../../store/holidays";

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

  const holidayList = props.dateList
    .map((date) =>
      holidays.filter((holiday) => new Date(holiday.date).getTime() === new Date(date).getTime())
    )
    .filter((holiday) => holiday.length);

  const onAddHoliday = () => {
    if (description.length > 1) {
      dispatch(addHoliday({ date, type: holidayType, description }));
      setDescription("");
    } else {
      alert("Please enter holiday description");
    }
  };

  const holidayLabel = holidayList.length ? (
    <Typography
      variant="caption"
      sx={{ display: "flex", justifyContent: "center" }}
    >{`Holidays from ${props.dateList[0].toLocaleDateString()} to ${props.dateList[
      props.dateList.length - 1
    ].toLocaleDateString()}`}</Typography>
  ) : (
    ""
  );

  console.log("Holidays rendered")

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="warning">
        Set Holidays
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
            {holidayLabel}
            <Stack divider={<Divider />} sx={stackStyle} spacing={0}>
              <TransitionGroup>
                {holidayList.map((holidays, i) =>
                  holidays.map((holiday, j) => (
                    <Collapse key={String(i) + String(j)}>
                      <HolidayItem {...holiday} />
                    </Collapse>
                  ))
                )}
              </TransitionGroup>
            </Stack>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}
