import { Grid, Typography } from "@mui/material";

export default function PayrollListItem(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption">Date Created: {new Date(props.date).toLocaleDateString()}</Typography>
      </Grid>
    </Grid>
  );
}
