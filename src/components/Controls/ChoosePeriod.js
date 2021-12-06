import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setPayrollPeriodFrom, setPayrollPeriodTo } from "../../store/userprefs";

export default function ChoosePeriod(props) {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.userprefs.currentPayrollPeriod);
  const startDate = current.from;
  const endDate = current.to;
  return (
    <Tooltip title="Choose payroll period" placement="top">
      <div>
        <TextField
          type="date"
          label="from"
          helperText="Covered Period"
          value={startDate}
          onChange={(e) => {
            dispatch(setPayrollPeriodFrom(e.target.value));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="date"
          label="to"
          value={endDate}
          onChange={(e) => {
            dispatch(setPayrollPeriodTo(e.target.value));
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </Tooltip>
  );
}
