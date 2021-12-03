//----------------------------SSS----------------------------
export const SSScontributionTableLink =
  "https://www.sss.gov.ph/sss/DownloadContent?fileName=2021-CONTRIBUTION-SCHEDULE.pdf";

export function computeSSSContribution(grossPay) {
  const minThreshold = 3000;
  const maxThreshold = 25000;
  const EErate = 0.045;
  const ERrate = 0.085;
  const msc = Math.max(Math.min(Math.round(grossPay / 500) * 500, maxThreshold), minThreshold);
  return { ER: msc * ERrate, EE: msc * EErate, EC: msc < 15000 ? 10 : 30 };
}

//----------------------------PHIC----------------------------
export const PHICcontributionTableLink =
  "https://www.philhealth.gov.ph/circulars/2019/circ2019-0009.pdf";

export function computePHICContribution(employee) {
  const minThreshold = 10000;
  const maxThreshold = 60000;
  const rate = 0.03;
  const msc = Math.min(
    Math.max((employee.salaryAmount * (365 - employee.restDays.length * 52)) / 12, minThreshold),
    maxThreshold
  );

  return Math.round(msc * rate * 100) / 100;
}

//----------------------------HDMF----------------------------
export const HDMFcontributionTableLink =
  "https://www.philhealth.gov.ph/circulars/2019/circ2019-0009.pdf";

export function computeHDMFContribution(grossPay) {
  const maxThreshold = 5000;
  const ERrate = 0.02;
  const EErate = grossPay > 1500 ? 0.02 : 0.01;
  const msc = Math.min(grossPay, maxThreshold);

  return { EE: msc * EErate, ER: msc * ERrate };
}
