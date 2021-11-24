import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRecord, updateRecord } from "../store/timekeeping";

export default function useTimeRecord(props) {
  const dispatch = useDispatch();
  const timeRecords = useSelector((state) => state.timeKeeping);
  let timeRecordIndex = timeRecords.findIndex(
    useCallback(
      (record) => record.day === props.date.getTime() && record.employeeId === props.employee.id,
      [props]
    )
  );
  const record = timeRecords[timeRecordIndex];
  const holidays = useSelector(
    useCallback(
      (state) =>
        state.holidays.filter(
          (holiday) => new Date(holiday.date).getTime() === new Date(props.date).getTime()
        ),
      [props]
    )
  );
  const isRestDay = props.employee.restDay === new Date(record?.day).getDay();

  const onChangeHandler = (key, event) =>
    dispatch(updateRecord({ index: timeRecordIndex, key: key, newValue: event.target.value }));

  useEffect(() => {
    if (timeRecordIndex === -1) {
      dispatch(
        createRecord({
          employeeId: props.employee.id,
          day: props.date.getTime(),
          timeIn: "",
          timeOut: "",
          overtime: 0,
          dayCategories: [isRestDay && "restDay", ...holidays.map((holiday) => holiday.type)],
        })
      );
    }
  });

  return { record, onChangeHandler, holidays, isRestDay };
}
