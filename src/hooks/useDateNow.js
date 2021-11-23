import { useState } from "react";

export default function useDateNow(daysDiff = 0) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const [date, setDate] = useState(
    new Date(Date.now() + daysDiff * msPerDay).toISOString().split("T")[0]
  );

  return [date, setDate];
}
