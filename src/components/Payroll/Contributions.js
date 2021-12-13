//----------------------------SSS----------------------------
export const SSScontributionTableLink =
  "https://www.sss.gov.ph/sss/DownloadContent?fileName=2021-CONTRIBUTION-SCHEDULE.pdf";

export class SSS {
  minThreshold = 3000;
  maxThreshold = 25000;
  EErate = 0.045;
  ERrate = 0.085;
  maxEE = this.EErate * this.maxThreshold;
  maxER = this.EErate * this.maxThreshold;
  compute(grossPay, prevContribution, noOfDays) {
    const ratio = Math.round((noOfDays / 30.58333) * 10) / 10;
    const msc = Math.max(
      Math.min(Math.round(grossPay / 500) * 500, this.maxThreshold),
      this.minThreshold * ratio
    );
    return {
      ER: Math.min(msc * this.ERrate, this.maxER - prevContribution),
      EE: Math.min(msc * this.EErate, this.maxEE - prevContribution),
      EC: msc < 15000 ? 10 : 30,
    };
  }
}

//----------------------------PHIC----------------------------
export const PHICcontributionTableLink =
  "https://www.philhealth.gov.ph/circulars/2019/circ2019-0009.pdf";

export class PHIC {
  minThreshold = 10000;
  maxThreshold = 60000;
  EErate = 0.03;
  ERrate = 0.03;
  minEE = this.EErate * this.minThreshold;
  maxEE = this.EErate * this.maxThreshold;
  compute(basicPay, prevPHICconts, noOfDays) {
    const ratio = Math.round((noOfDays / 30.58333) * 10) / 10;
    const cont = basicPay * this.EErate;
    const min = Math.max(cont + prevPHICconts, this.minEE * ratio - prevPHICconts);
    const max = Math.min(min, this.maxEE - prevPHICconts);
    return Math.round(max * 100) / 100;
  }
}

//----------------------------HDMF----------------------------
export const HDMFcontributionTableLink =
  "https://www.philhealth.gov.ph/circulars/2019/circ2019-0009.pdf";

export class HDMF {
  minThreshold = 0;
  maxThreshold = 5000;
  EErate = (grossPay) => (grossPay > 1500 ? 0.02 : 0.01);
  ERrate = 0.02;
  maxEE = (grossPay) => this.EErate(grossPay) * this.maxThreshold;
  maxER = this.ERrate * this.maxThreshold;
  compute(grossPay, prevContribution, noOfDays) {
    const ratio = Math.round((noOfDays / 30.58333) * 10) / 10;
    const msc = Math.min(grossPay, this.maxThreshold);
    return {
      EE: Math.min(msc * this.EErate(grossPay), this.maxEE(grossPay) * ratio - prevContribution),
      ER: Math.min(msc * this.ERrate, this.maxER * ratio - prevContribution),
    };
  }
}
