import { ListItem, ListItemText } from "@mui/material";

export default function TimeRecord(props) {
  return (
    <ListItem>
      <ListItemText>This is a time record no. {props.id}</ListItemText>
    </ListItem>
  );
}
