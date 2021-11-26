import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createRecord, updateRecord } from "../store/timerecords";

export default function useTimeRecord(props) {
  const dispatch = useDispatch();
  const record = useSelector(
    (state) =>
      state.timeKeeping.find(
        (record) => record.day === props.date && record.employeeId === props.employeeId
      ),
    shallowEqual
  );

  const holidays = useSelector(
    (state) => state.holidays.filter((holiday) => new Date(holiday.date).getTime() === props.date),
    shallowEqual
  );

  const isRestDay = Boolean(
    props.restDays.filter((day) => day === new Date(props.date).getDay()).length
  );

  const getTimeDifference = (start, end) => {
    const [startHour, startMinutes] = start.split(":").map((item) => parseInt(item));
    const [endHour, endMinutes] = end.split(":").map((item) => parseInt(item));
    const diffMinutes = (startMinutes - endMinutes) / 60;
    const diffHour = startHour - endHour;
    const result = diffHour + diffMinutes;
    if (isNaN(result)) {
      return 0;
    } else {
      return result.toFixed(2);
    }
  };

  const onChangeHandler = (key, e) => {
    if (key === "isAbsent") {
      dispatch(updateRecord({ index: record.id, key, newValue: e.target.checked }));
      onChangeHandler("timeIn", { target: { value: e.target.checked ? "" : String(props.from) } });
      onChangeHandler("timeOut", { target: { value: e.target.checked ? "" : String(props.to) } });
    } else {
      dispatch(updateRecord({ index: record.id, key, newValue: e.target.value }));
    }

    if (key === "timeOut") {
      dispatch(
        updateRecord({
          index: record.id,
          key: "overtime",
          newValue: Math.max(getTimeDifference(e.target.value, props.to), 0),
        })
      );
    }
  };

  useEffect(() => {
    if (!record) {
      dispatch(
        createRecord({
          employeeId: props.employeeId,
          day: props.date,
          timeIn: isRestDay || holidays.length ? "" : props.from,
          timeOut: isRestDay || holidays.length ? "" : props.to,
          overtime: 0,
          isRestDay,
          holidays: holidays.map((holiday) => holiday.type),
        })
      );
    }
  });

  return { record, onChangeHandler, holidays, isRestDay };
}
