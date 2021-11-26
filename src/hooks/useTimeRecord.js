import { useEffect, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createRecord, updateRecord } from "../store/timerecords";

export default function useTimeRecord(props) {
  const dispatch = useDispatch();
  const record = useSelector(
    useCallback(
      (state) =>
        state.timeKeeping.find(
          (record) => record.day === props.date && record.employeeId === props.employeeId
        ),
      [props.employeeId, props.date]
    ), shallowEqual
  );

  const holidays = useSelector(
    useCallback(
      (state) =>
        state.holidays.filter((holiday) => new Date(holiday.date).getTime() === props.date),
      [props]
    )
  );
  const isRestDay = Boolean(
    props.restDays.filter((day) => day === new Date(props.date).getDay()).length
  );

  const onChangeHandler = (key, event) => {
    dispatch(updateRecord({ index: record.id, key: key, newValue: event.target.value }));
  };
  console.log("useTimeRecord rendered");

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
