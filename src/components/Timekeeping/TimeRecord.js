import { Grid, TextField, Typography } from "@mui/material";
export default function TimeRecord(props) {
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
          type="time"
          label="Time In"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          type="time"
          label="Time Out"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
}
