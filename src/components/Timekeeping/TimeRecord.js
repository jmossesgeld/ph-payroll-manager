import { Chip, Grid, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createRecord, updateRecord } from "../../store/timekeeping";
import { useEffect } from "react";
import { Box } from "@mui/system";

export default function TimeRecord(props) {
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.holidays).filter(
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
    <Grid container rowSpacing={2}>
      <Grid item xs={12} mb={1}>
        <Box sx={{ display: "flex", "& div": { ml: 2 }, overflow: "auto" }}>
          <Typography variant="overline" fontWeight="bold" fullWidth>
            {props.date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          {holidays.map((holiday, idx) => (
            <Tooltip title={holiday.description} placement="top" arrow >
              <Chip
                label={
                  holiday.type === "regular" ? "Regular Holiday" : "Special Non-Working Holiday"
                }
                variant="outlined"
                key={idx}
                color="warning"
              />
            </Tooltip>
          ))}
        </Box>
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
      <Grid item xs={12} sm={12} md={3}></Grid>
    </Grid>
  );
}
