//----------------------------SSS----------------------------
export const SSScontributionTableLink =
  "https://www.sss.gov.ph/sss/DownloadContent?fileName=2021-CONTRIBUTION-SCHEDULE.pdf";

export class SSSthresholds {
  minThreshold = 3000;
  maxThreshold = 25000;
  EErate = 0.045;
  ERrate = 0.085;
  maxEE = this.EErate * this.maxThreshold;
}

export function computeSSSContribution(grossPay) {
  const thresholds = new SSSthresholds();
  const msc = Math.max(
    Math.min(Math.round(grossPay / 500) * 500, thresholds.maxThreshold),
    thresholds.minThreshold
  );
  return {
    ER: msc * thresholds.ERrate,
    EE: msc * thresholds.EErate,
    EC: msc < 15000 ? 10 : 30,
  };
}

//----------------------------PHIC----------------------------
export const PHICcontributionTableLink =
  "https://www.philhealth.gov.ph/circulars/2019/circ2019-0009.pdf";

export class PHICthresholds {
  minThreshold = 10000;
  maxThreshold = 60000;
  EErate = 0.03;
  ERrate = 0.03;
  maxEE = this.EErate * this.maxThreshold;
}

export function computePHICContribution(employee) {
  const thresholds = new PHICthresholds();
  const msc = Math.min(
    Math.max(
      (employee.salaryAmount * (365 - employee.restDays.length * 52)) / 12,
      thresholds.minThreshold
    ),
    thresholds.maxThreshold
  );

  return Math.round(msc * thresholds.EErate * 100) / 100;
}

//----------------------------HDMF----------------------------
export const HDMFcontributionTableLink =
  "https://www.philhealth.gov.ph/circulars/2019/circ2019-0009.pdf";

export class HDMFthresholds {
  minThreshold = 0;
  maxThreshold = 5000;
  EErate = (grossPay) => (grossPay > 1500 ? 0.02 : 0.01);
  ERrate = 0.02;
  maxEE = (grossPay) => this.EErate(grossPay) * this.maxThreshold;
}

export function computeHDMFContribution(grossPay) {
  const thresholds = new HDMFthresholds();
  const msc = Math.min(grossPay, thresholds.maxThreshold);

  return { EE: msc * thresholds.EErate(grossPay), ER: msc * thresholds.ERrate };
}
