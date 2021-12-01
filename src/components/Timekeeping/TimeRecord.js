import {
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useTimeRecord from "../../hooks/useTimeRecord";

const styles = {
  dateLabel: { display: "flex", "& div": { ml: 2 }, overflow: "auto" },
  timeInput: { display: "flex", "& .MuiFormControl-root": { mb: 1 } },
};

export default function TimeRecord(props) {
  const { record, onChangeHandler } = useTimeRecord(props.date, props.employee);

  const dayCategories = (
    <Grid container>
      {record?.holidays.map((holiday, idx) => (
        <Grid key={idx} item xs={6} sm={6} md={12}>
          <Tooltip title={holiday.description} placement="top" arrow>
            <Chip
              label={holiday.type === "regular" ? "Regular Holiday" : "Special Day"}
              variant="outlined"
              key={idx}
              color="warning"
              sx={{ width: "100%" }}
            />
          </Tooltip>
        </Grid>
      ))}
      {record?.isRestDay && (
        <Grid item xs={6} sm={6} md={12}>
          <Chip label="Rest Day" variant="outlined" sx={{ width: "100%" }} color="primary" />
        </Grid>
      )}
    </Grid>
  );

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12} mb={1}>
        <Box sx={styles.dateLabel}>
          <Typography variant="overline" fontWeight="bold">
            {new Date(props.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5} sx={styles.timeInput}>
        <TextField
          type="time"
          label="Time In"
          disabled={record?.isAbsent || false}
          value={record?.timeIn ?? ""}
          onChange={onChangeHandler.bind(null, "timeIn")}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="time"
          label="Time Out"
          disabled={record?.isAbsent || false}
          value={record?.timeOut ?? ""}
          onChange={onChangeHandler.bind(null, "timeOut")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={7}>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} md={3}>
            <FormControlLabel
              label="Absent"
              control={
                <Checkbox
                  checked={record?.isAbsent ?? false}
                  disabled={record?.isRestDay || record?.holidays.length > 0 || false}
                  onChange={onChangeHandler.bind(null, "isAbsent")}
                />
              }
            />
          </Grid>
          <Grid item xs={4} sm={4} md={2.75}>
            <TextField
              type="number"
              variant="standard"
              label="Late"
              size="small"
              disabled={record?.isAbsent || false}
              value={record?.late ?? 0.0}
              onChange={onChangeHandler.bind(null, "late")}
              InputProps={{
                endAdornment: <InputAdornment position="start">hr(s)</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={2.75}>
            <TextField
              type="number"
              variant="standard"
              label={record?.overtime > 0 ? "Overtime" : "Undertime"}
              size="small"
              disabled={record?.isAbsent || false}
              value={record?.overtime || record?.undertime || 0}
              onChange={onChangeHandler.bind(null, "overtime")}
              InputProps={{
                endAdornment: <InputAdornment position="start">hr(s)</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3.5}>
            {dayCategories}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
