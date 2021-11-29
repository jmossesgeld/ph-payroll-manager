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
  timeInput: { display: "flex", flexWrap: "wrap", "& .MuiFormControl-root": { mr: 1, mb: 1 } },
};

export default function TimeRecord(props) {
  const { record, onChangeHandler, holidays, isRestDay } = useTimeRecord(props);

  const dayCategories = (
    <Grid container>
      {holidays.map((holiday, idx) => (
        <Grid item xs={6}>
          <Tooltip key={idx} title={holiday.description} placement="top" arrow>
            <Chip
              label={holiday.type === "regular" ? "Regular Holiday" : "Special Non-Working Holiday"}
              variant="outlined"
              key={idx}
              color="warning"
            />
          </Tooltip>
        </Grid>
      ))}
      {isRestDay && (
        <Grid item xs={6}>
          <Chip label="Rest Day" variant="outlined" color="primary" />
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
      <Grid item xs={4} sm={4} md={5} sx={styles.timeInput}>
        <TextField
          type="time"
          label="Time In"
          disabled={record?.isAbsent}
          value={record?.timeIn ?? ""}
          onChange={onChangeHandler.bind(null, "timeIn")}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="time"
          label="Time Out"
          disabled={record?.isAbsent}
          value={record?.timeOut ?? ""}
          onChange={onChangeHandler.bind(null, "timeOut")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={8} sm={8} md={7}>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} md={2.5}>
            <FormControlLabel
              label="Absent"
              control={
                <Checkbox
                  checked={record?.isAbsent ?? false}
                  disabled={(isRestDay || holidays.length) ?? false}
                  onChange={onChangeHandler.bind(null, "isAbsent")}
                />
              }
            />
          </Grid>
          <Grid item xs={4} sm={4} md={3}>
            <TextField
              type="number"
              variant="standard"
              label="Late"
              size="small"
              disabled={record?.isAbsent}
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
          <Grid item xs={4} sm={4} md={3}>
            <TextField
              type="number"
              variant="standard"
              label="Overtime"
              size="small"
              disabled={record?.isAbsent}
              value={record?.overtime ?? 0.0}
              onChange={onChangeHandler.bind(null, "overtime")}
              InputProps={{
                endAdornment: <InputAdornment position="start">hr(s)</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3.5}>
            {dayCategories.map}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
