import { getTimeDifference } from "../../store/userprefs";
import { createRecord } from "../../store/timerecords";
import { getFullName } from "../../store/employees";
import { SSS, PHIC, HDMF, TAX } from "./Deductions";

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
        absences: prev.absences + (current.isAbsent ? -8 : 0),
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
      grossModifiers: computeGrossModifiers(timeRecords),
    };
  });

  return payrollData;
}

function getPreviousContributions(previousPayrolls, employeeID) {
  return previousPayrolls.reduce(
    (prev, curr) => {
      const employeePay = curr.rows.find((payroll) => payroll.employeeID === employeeID);
      return {
        accumBasicPay: prev.accumBasicPay + employeePay?.basicPay ?? 0,
        accumGrossPay: prev.accumGrossPay + employeePay?.grossPay ?? 0,
        prevSSSConts: prev.prevSSSConts + employeePay?.sssCont ?? 0,
        prevPHICConts: prev.prevPHICConts + employeePay?.phicCont ?? 0,
        prevHDMFConts: prev.prevHDMFConts + employeePay?.hdmfCont ?? 0,
        prevTAX: prev.prevTAX + employeePay?.tax ?? 0,
      };
    },
    {
      prevSSSConts: 0,
      prevPHICConts: 0,
      prevHDMFConts: 0,
      accumBasicPay: 0,
      accumGrossPay: 0,
      prevTAX: 0,
    } //initial value
  );
}

export function createRows(payrollData, previousPayrolls, payrollOptions) {
  return payrollData.map((data) => {
    const dateList = data.dateList;
    const modifiers = data.grossModifiers;
    const employee = data.employee;

    let hourlyRate, basicPay;
    if (employee.salaryType === "daily") {
      hourlyRate = employee.salaryAmount / 8;
      basicPay = hourlyRate * modifiers.normalDaysWorked * 8;
    } else {
      hourlyRate = (employee.salaryAmount * 12) / (365 - employee.restDays.length * 52) / 8;
      basicPay = payrollOptions.enforceDailyRate
        ? hourlyRate * modifiers.normalDaysWorked * 8
        : dateList.length > 17
        ? employee.salaryAmount
        : dateList.length > 9
        ? employee.salaryAmount / 2
        : employee.salaryAmount / 4;
    }

    const employeeID = employee.id;
    const employeeName = getFullName(employee);
    const overtime = hourlyRate * modifiers.overtime;
    const holiday = hourlyRate * (modifiers.regularHoliday + modifiers.specialHoliday);
    const restDay = hourlyRate * modifiers.restDay;
    const lateUndertime = hourlyRate * (modifiers.late + modifiers.undertime);
    const absences = hourlyRate * modifiers.absences;
    const grossPay = basicPay + overtime + holiday + restDay + lateUndertime + absences;

    const { prevSSSConts, prevPHICConts, prevHDMFConts, accumGrossPay, accumBasicPay, prevTAX } =
      getPreviousContributions(previousPayrolls, employeeID);

    const sssCont =
      payrollOptions.sssCont && employee.eligibilities.SSS
        ? -new SSS().compute(accumGrossPay + grossPay, -prevSSSConts).EE
        : 0;
    const phicCont =
      payrollOptions.phicCont && employee.eligibilities.PHIC
        ? -new PHIC().compute(accumBasicPay + basicPay, -prevPHICConts)
        : 0;
    const hdmfCont =
      payrollOptions.hdmfCont && employee.eligibilities.HDMF
        ? -new HDMF().compute(accumGrossPay + grossPay, -prevHDMFConts).EE
        : 0;

    const netTaxableIncome =
      accumGrossPay +
      grossPay +
      sssCont +
      phicCont +
      hdmfCont -
      prevSSSConts -
      prevPHICConts -
      prevHDMFConts;
    const tax = netTaxableIncome > 0 ? -TAX(netTaxableIncome, prevTAX) : 0;

    const others = payrollOptions.others;

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
      tax,
      dateList,
      ...others,
    };
  });
}
