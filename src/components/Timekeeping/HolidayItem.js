import { Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeHoliday } from "../../store/holidays";

export default function HolidayItem(props) {
  const dispatch = useDispatch();

  const onRemoveHoliday = () => {
    dispatch(removeHoliday({ date: props.date, description: props.description }));
  };

  return (
    <Grid container spacing={1} sx={{ padding: 2 }}>
      <Grid item xs={12} sm={4}>
        <Typography sx={{ color: "red" }} fontWeight="bold">
          {props.date}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="overline">{props.description}</Typography>
      </Grid>
      <Grid item xs={12} sm={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="warning" onClick={onRemoveHoliday}>
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}
