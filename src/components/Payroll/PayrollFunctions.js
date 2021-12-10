import { getTimeDifference } from "../../store/userprefs";
import { createRecord } from "../../store/timerecords";
import { getFullName } from "../../store/employees";
import {
  computeHDMFContribution,
  computePHICContribution,
  computeSSSContribution,
  SSSthresholds,
  PHICthresholds,
  HDMFthresholds,
} from "./Contributions";

export function computeGrossModifiers(timeRecords) {
  return timeRecords.reduce(
    (prev, current) => {
      const hours =
        parseFloat(getTimeDifference(current.timeOut, current.timeIn)) > 0
          ? 8 - current.late - Math.min(current.overtime, 0)
          : 0;
      const regularHolidays = current.holidays.filter(
        (holiday) => holiday.type === "regular"
      ).length; //determine no. of regular holidays
      const specialHolidays = current.holidays.filter(
        (holiday) => holiday.type === "special"
      ).length; //determine no. of special holidays
      let multiplier = 1;
      if (current.isRestDay) {
        if (specialHolidays) {
          multiplier = 1.5;
        } else if (regularHolidays) {
          multiplier = 2.6;
        } else {
          multiplier = 1.3;
        }
      } else if (specialHolidays) {
        multiplier = 1.3;
      } else if (regularHolidays) {
        multiplier = 1 + regularHolidays;
      }
      return {
        normalDaysWorked:
          prev.normalDaysWorked +
          (!current.isRestDay && !specialHolidays && !regularHolidays ? 1 : 0),
        overtime: prev.overtime + Math.max(current.overtime, 0) * multiplier * 1.25,
        undertime: prev.undertime + Math.min(current.overtime, 0) * multiplier,
        regularHoliday: prev.regularHoliday + (regularHolidays ? multiplier : 0) * hours,
        specialHoliday: prev.specialHoliday + (specialHolidays ? multiplier : 0) * hours,
        restDay:
          prev.restDay +
          (current.isRestDay && specialHolidays === 0 && regularHolidays === 0 ? multiplier : 0) *
            hours,
        late: prev.late + current.late * multiplier,
        absences: prev.absences + (current.isAbsent ? 8 : 0),
      }; //grossModifier object to be passed to next record
    },
    {
      normalDaysWorked: 0,
      overtime: 0,
      undertime: 0,
      regularHoliday: 0,
      specialHoliday: 0,
      restDay: 0,
      late: 0,
      absences: 0,
    } //initial value of reduce
  );
}

function getPreviousContributions(previousPayrolls, employeeID) {
  return previousPayrolls.reduce(
    (prev, curr) => {
      const employeePay = curr.find((payroll) => payroll.employeeID === employeeID);
      return {
        prevSSSConts: prev.prevSSSConts + employeePay?.sssCont ?? 0,
        prevPHICConts: prev.prevPHICConts + employeePay?.phicCont ?? 0,
        prevHDMFConts: prev.prevHDMFConts + employeePay?.hdmfCont ?? 0,
      };
    },
    { prevSSSConts: 0, prevPHICConts: 0, prevHDMFConts: 0 } //initial value
  );
}

export function createRows(payrollData, previousPayrolls, payrollOptions) {
  return payrollData.map((data) => {
    const dateList = data.dateList;

    let hourlyRate, modifiers, basicPay;
    if (data.employee.salaryType === "daily") {
      hourlyRate = data.employee.salaryAmount / 8;
      modifiers = data.grossModifiers;
      basicPay = hourlyRate * modifiers.normalDaysWorked * 8;
    } else {
      hourlyRate =
        (data.employee.salaryAmount * 12) / (365 - data.employee.restDays.length * 52) / 8;
      modifiers = data.grossModifiers;
      basicPay = payrollOptions.enforceDailyRate
        ? hourlyRate * modifiers.normalDaysWorked * 8
        : dateList.length > 17
        ? data.employee.salaryAmount
        : dateList.length > 9
        ? data.employee.salaryAmount / 2
        : data.employee.salaryAmount / 4;
    }

    console.log(payrollOptions.enforceDailyRate);

    const employeeID = data.employee.id;
    const employeeName = getFullName(data.employee);
    const overtime = hourlyRate * modifiers.overtime;
    const holiday = hourlyRate * (modifiers.regularHoliday + modifiers.specialHoliday);
    const restDay = hourlyRate * modifiers.restDay;
    const lateUndertime = hourlyRate * (modifiers.late + modifiers.undertime);
    const absences = hourlyRate * modifiers.absences;
    const grossPay = basicPay + overtime + holiday + restDay - lateUndertime - absences;

    const { prevSSSConts, prevPHICConts, prevHDMFConts } = getPreviousContributions(
      previousPayrolls,
      employeeID
    );
    const sssCont = payrollOptions.sssCont
      ? Math.min(computeSSSContribution(grossPay).EE, new SSSthresholds().maxEE - prevSSSConts)
      : 0;
    const phicCont = payrollOptions.phicCont
      ? Math.min(computePHICContribution(data.employee), new PHICthresholds().maxEE - prevPHICConts)
      : 0;
    const hdmfCont = payrollOptions.hdmfCont
      ? Math.min(
          computeHDMFContribution(grossPay).EE,
          new HDMFthresholds().maxEE(grossPay) - prevHDMFConts
        )
      : 0;

    return {
      id: employeeID,
      employeeID,
      employeeName,
      basicPay,
      overtime,
      holiday,
      restDay,
      lateUndertime,
      absences,
      grossPay,
      sssCont,
      phicCont,
      hdmfCont,
      dateList,
    };
  });
}

export function generatePayrollData(employees, dateList, filteredTimeRecords, holidays, dispatch) {
  const payrollData = employees.map((employee) => {
    const timeRecords = dateList.map((date) => {
      const record = filteredTimeRecords.find(
        (record) => record.date === date && record.employeeId === employee.id
      );
      const listOfHolidays = holidays.filter(
        (holiday) => new Date(holiday.date).getTime() === date
      );
      const isRestDay = Boolean(
        employee.restDays.filter((day) => day === new Date(date).getDay()).length
      );
      if (!record) {
        const newRecord = {
          employeeId: employee.id,
          date,
          timeIn: isRestDay || listOfHolidays.length ? "" : employee.workingHours.from,
          timeOut: isRestDay || listOfHolidays.length ? "" : employee.workingHours.to,
          overtime: 0.0,
          late: 0.0,
          isRestDay,
          holidays: listOfHolidays,
        };
        dispatch(createRecord(newRecord));
        return newRecord;
      } else {
        return { ...record, isRestDay, holidays: listOfHolidays };
      }
    });

    return {
      employee,
      dateList,
      timeRecords,
      grossModifiers: computeGrossModifiers(timeRecords),
    };
  });

  return payrollData;
}
