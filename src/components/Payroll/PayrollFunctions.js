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

export function createRows(payrollData, previousPayrolls) {
  return payrollData.map((data) => {
    let rate, modifiers, basicPay;
    if (data.employee.salaryType === "daily") {
      rate = data.employee.salaryAmount / 8;
      modifiers = data.grossModifiers;
      basicPay = rate * modifiers.normalDaysWorked * 8;
    } else {
      rate = data.employee.salaryAmount / 8;
      modifiers = data.grossModifiers;
      basicPay = rate * modifiers.normalDaysWorked * 8;
    }
    const dateList = data.dateList;
    const employeeID = data.employee.id;
    const employeeName = getFullName(data.employee);
    const overtime = rate * modifiers.overtime;
    const holiday = rate * (modifiers.regularHoliday + modifiers.specialHoliday);
    const restDay = rate * modifiers.restDay;
    const lateUndertime = rate * (modifiers.late + modifiers.undertime);
    const absences = rate * modifiers.absences;
    const grossPay = basicPay + overtime + holiday + restDay - lateUndertime - absences;

    const { prevSSSConts, prevPHICConts, prevHDMFConts } = getPreviousContributions(
      previousPayrolls,
      employeeID
    );
    console.log(prevSSSConts, prevPHICConts, prevHDMFConts);
    const sssCont = Math.min(
      computeSSSContribution(grossPay).EE,
      new SSSthresholds().maxEE - prevSSSConts
    );
    const phicCont = Math.min(
      computePHICContribution(data.employee),
      new PHICthresholds().maxEE - prevPHICConts
    );
    const hdmfCont = Math.min(
      computeHDMFContribution(grossPay).EE,
      new HDMFthresholds().maxEE(grossPay) - prevHDMFConts
    );

    return {
      dateList,
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
    };
  });
}

export function generatePayrollData(employees, dateList, filteredTimeRecords, holidays, dispatch) {
  const payrollData = employees.map((employee) => {
    const timeRecords = dateList.map((date) => {
      const record = filteredTimeRecords.find(
        (record) => record.date === date && record.employeeId === employee.id
      );
      if (!record) {
        const listOfHolidays = holidays.filter(
          (holiday) => new Date(holiday.date).getTime() === date
        );
        const isRestDay = Boolean(
          employee.restDays.filter((day) => day === new Date(date).getDay()).length
        );
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
        return record;
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
