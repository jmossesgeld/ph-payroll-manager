import { List } from "@mui/material";
import TimeRecord from "./TimeRecord";

export default function Timekeeping() {
  const someList = [1, 2, 3];
  return (
    <List>
      {someList.map((item) => {
        return <TimeRecord id={item} />;
      })}
    </List>
  );
}
