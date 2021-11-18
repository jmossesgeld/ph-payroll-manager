import { Grid, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createRecord, updateRecord } from "../../store/timeKeepingSlice";
import React, { useEffect } from "react";

export default function TimeRecord(props) {
  const dispatch = useDispatch();
  const timeRecords = useSelector((state) => state.timeKeeping);

  const getRecordIndex = () => {
    const recordIndex = timeRecords.findIndex(
      (record) => record.day === props.date.getTime() && record.employeeId === props.employeeId
    );
    if (recordIndex === -1) {
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
      return timeRecords.length;
    } else {
      return recordIndex;
    }
  };

  const timeRecordIndex = getRecordIndex();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="overline">
          {props.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          // type="time"
          label="Time In"
          value={
            timeRecords[timeRecordIndex] !== undefined ? timeRecords[timeRecordIndex].timeIn : ""
          }
          onChange={(e) =>
            dispatch(
              updateRecord({ index: timeRecordIndex, key: "timeIn", newValue: e.target.value })
            )
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          // type="time"
          label="Time Out"
          value={
            timeRecords[timeRecordIndex] !== undefined ? timeRecords[timeRecordIndex].timeOut : ""
          }
          onChange={(e) =>
            dispatch(
              updateRecord({ index: timeRecordIndex, key: "timeOut", newValue: e.target.value })
            )
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
}
