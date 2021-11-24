import { Chip, Grid, InputAdornment, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createRecord, updateRecord } from "../../store/timekeeping";
import { useEffect } from "react";
import { Box } from "@mui/system";

const styles = {
  dateLabel: { display: "flex", "& div": { ml: 2 }, overflow: "auto" },
  timeInput: { display: "flex", flexWrap: "wrap", "& .MuiFormControl-root": { mr: 1, mb: 1 } },
};

export default function TimeRecord(props) {
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.holidays).filter(
    (holiday) => new Date(holiday.date).getTime() === new Date(props.date).getTime()
  );
  const timeRecords = useSelector((state) => state.timeKeeping);
  let timeRecordIndex = timeRecords.findIndex(
    (record) => record.day === props.date.getTime() && record.employeeId === props.employee.id
  );
  const record = timeRecords[timeRecordIndex];
  const isRestDay = props.employee.restDay === new Date(record?.day).getDay();

  const onChangeHandler = (key, event) =>
    dispatch(updateRecord({ index: timeRecordIndex, key: key, newValue: event.target.value }));

  const dayCategories = (
    <Stack>
      {holidays.map((holiday, idx) => (
        <Tooltip key={idx} title={holiday.description} placement="top" arrow>
          <Chip
            label={holiday.type === "regular" ? "Regular Holiday" : "Special Non-Working Holiday"}
            variant="outlined"
            key={idx}
            color="warning"
          />
        </Tooltip>
      ))}
      {isRestDay && <Chip label="Rest Day" variant="outlined" color="primary" />}
    </Stack>
  );

  useEffect(() => {
    if (timeRecordIndex === -1) {
      dispatch(
        createRecord({
          employeeId: props.employee.id,
          day: props.date.getTime(),
          timeIn: "",
          timeOut: "",
          overtime: 0,
          dayCategories: [isRestDay && "restDay", ...holidays.map((holiday) => holiday.type)],
        })
      );
    }
  });

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12} mb={1}>
        <Box sx={styles.dateLabel}>
          <Typography variant="overline" fontWeight="bold">
            {props.date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={6} sx={styles.timeInput}>
        <TextField
          type="time"
          label="Time In"
          value={record?.timeIn ?? ""}
          onChange={onChangeHandler.bind(null, "timeIn")}
          InputLabelProps={{
            shrink: true,
          }}
        />
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
      <Grid item xs={6} sm={6} md={6}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={6}>
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
          <Grid item xs={12} sm={6} md={6}>
            {dayCategories}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
