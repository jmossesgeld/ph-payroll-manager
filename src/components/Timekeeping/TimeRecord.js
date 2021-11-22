import { Chip, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createRecord, updateRecord } from "../../store/timekeeping";
import { useEffect } from "react";
import { Box } from "@mui/system";

export default function TimeRecord(props) {
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.holidays).find(
    (holiday) => new Date(holiday.date).getTime() === new Date(props.date).getTime()
  );

  const timeRecords = useSelector((state) => state.timeKeeping);
  let timeRecordIndex = timeRecords.findIndex(
    (record) => record.day === props.date.getTime() && record.employeeId === props.employeeId
  );
  const record = timeRecords[timeRecordIndex];

  const onChangeHandler = (key, event) =>
    dispatch(updateRecord({ index: timeRecordIndex, key: key, newValue: event.target.value }));

  useEffect(() => {
    if (timeRecordIndex === -1) {
      dispatch(
        createRecord({
          employeeId: props.employeeId,
          day: props.date.getTime(),
          timeIn: "",
          timeOut: "",
          overtime: 0,
          dayCategories: [],
        })
      );
    }
  });

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12} mb={1}>
        <Typography variant="overline" fontWeight="bold">
          {props.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <TextField
          type="time"
          label="Time In"
          value={record?.timeIn ?? ""}
          onChange={onChangeHandler.bind(null, "timeIn")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <TextField
          type="time"
          label="Time Out"
          value={record?.timeOut ?? ""}
          onChange={onChangeHandler.bind(null, "timeOut")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={2} mr={2}>
        <TextField
          type="number"
          label="Overtime"
          value={record?.overtime ?? ""}
          onChange={onChangeHandler.bind(null, "overtime")}
          InputProps={{
            endAdornment: <InputAdornment position="start">hour(s)</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {holiday !== undefined ? <Chip label="Regular Holiday" variant="outlined" /> : null}
          <Chip label="Special Non-Working Holiday" variant="outlined" />
        </Box>
      </Grid>
    </Grid>
  );
}
