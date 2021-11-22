import { Button, Grid, Typography } from "@mui/material";

export default function HolidayItem(props) {
  return (
    <Grid container spacing={1} sx={{ padding: 2 }}>
      <Grid item xs={12} sm={4}>
        <Typography sx={{ color: "red" }} fontWeight="bold">{props.date}</Typography>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="overline">{props.description}</Typography>
      </Grid>
      <Grid item xs={12} sm={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button  color="warning" onClick={props.onRemove.bind(props.date)}>
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}
