import { useState } from "react";

export default function useDateNow(daysDiff) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const [date, setDate] = useState(
    new Date(Date.now() + (daysDiff || 0) * msPerDay).toISOString().split("T")[0]
  );

  return [date, setDate];
}
