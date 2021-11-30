import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createRecord, updateRecord } from "../store/timerecords";

export default function useTimeRecord(props) {
  const dispatch = useDispatch();
  const record = useSelector(
    (state) =>
      state.timeKeeping.find(
        (record) => record.date === props.date && record.employeeId === props.employee.id
      ),
    shallowEqual
  );

  const holidays = useSelector(
    (state) => state.holidays.filter((holiday) => new Date(holiday.date).getTime() === props.date),
    shallowEqual
  );

  const isRestDay = Boolean(
    props.employee.restDays.filter((day) => day === new Date(props.date).getDay()).length
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
      return Math.max(result.toFixed(2), 0);
    }
  };

  const onChangeHandler = (key, e) => {
    if (key === "isAbsent") {
      dispatch(updateRecord({ index: record.id, key, newValue: e.target.checked }));
      onChangeHandler("timeIn", {
        target: {
          value:
            e.target.checked || isRestDay || holidays.length
              ? ""
              : String(props.employee.workingHours.from),
        },
      });
      onChangeHandler("timeOut", {
        target: {
          value:
            e.target.checked || isRestDay || holidays.length
              ? ""
              : String(props.employee.workingHours.to),
        },
      });
    } else {
      dispatch(updateRecord({ index: record.id, key, newValue: e.target.value }));
    }

    if (key === "timeOut") {
      dispatch(
        updateRecord({
          index: record.id,
          key: "overtime",
          newValue: getTimeDifference(e.target.value, props.employee.workingHours.to),
        })
      );
    }

    if (key === "timeIn") {
      dispatch(
        updateRecord({
          index: record.id,
          key: "late",
          newValue: getTimeDifference(e.target.value, props.employee.workingHours.from),
        })
      );
    }
  };

  useEffect(() => {
    if (!record) {
      dispatch(
        createRecord({
          employeeId: props.employee.id,
          date: props.date,
          timeIn: isRestDay || holidays.length ? "" : props.employee.workingHours.from,
          timeOut: isRestDay || holidays.length ? "" : props.employee.workingHours.to,
          overtime: 0.0,
          late: 0.0,
          isRestDay,
          holidays,
        })
      );
    } else {
      dispatch(
        updateRecord({
          index: record.id,
          key: "holidays",
          newValue: holidays,
        })
      );
      dispatch(
        updateRecord({
          index: record.id,
          key: "isRestDay",
          newValue: isRestDay,
        })
      );
    }
  });

  return { record, onChangeHandler, holidays, isRestDay };
}
