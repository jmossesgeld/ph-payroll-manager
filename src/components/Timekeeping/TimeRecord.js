import { ListItem, ListItemText, TextField, Typography } from "@mui/material";
export default function TimeRecord(props) {

  return (
    <ListItem>
      <ListItemText>
        <Typography variant="h6">
          {props.date}
        </Typography>
        <TextField type="time" placeholder="Time In"/>
        <TextField type="time" placeholder="Time Out"/>
      </ListItemText>
    </ListItem>
  );
}
