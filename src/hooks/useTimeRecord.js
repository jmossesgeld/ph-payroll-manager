import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createRecord, updateRecord } from "../store/timerecords";
import { getTimeDifference } from "../store/userprefs";

export default function useTimeRecord(date, employee) {
  const dispatch = useDispatch();
  const record = useSelector(
    (state) =>
      state.timeKeeping.find((record) => record.date === date && record.employeeId === employee.id),
    shallowEqual
  );

  const holidays = useSelector(
    (state) => state.holidays.filter((holiday) => new Date(holiday.date).getTime() === date),
    shallowEqual
  );

  const isRestDay = Boolean(
    employee.restDays.filter((day) => day === new Date(date).getDay()).length
  );

  const onChangeHandler = (key, e) => {
    if (key === "isAbsent") {
      dispatch(updateRecord({ index: record.id, key, newValue: e.target.checked }));
      onChangeHandler("timeIn", {
        target: {
          value:
            e.target.checked || isRestDay || holidays.length
              ? ""
              : String(employee.workingHours.from),
        },
      });
      onChangeHandler("timeOut", {
        target: {
          value:
            e.target.checked || isRestDay || holidays.length
              ? ""
              : String(employee.workingHours.to),
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
          newValue: getTimeDifference(e.target.value, employee.workingHours.to),
        })
      );
    }

    if (key === "timeIn") {
      dispatch(
        updateRecord({
          index: record.id,
          key: "late",
          newValue: Math.max(getTimeDifference(e.target.value, employee.workingHours.from), 0),
        })
      );
    }
  };

  useEffect(() => {
    if (!record) {
      dispatch(
        createRecord({
          employeeId: employee.id,
          date,
          timeIn: isRestDay || holidays.length ? "" : employee.workingHours.from,
          timeOut: isRestDay || holidays.length ? "" : employee.workingHours.to,
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
