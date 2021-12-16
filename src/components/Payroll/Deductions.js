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
  compute(grossPay, prevContribution) {
    const msc = Math.max(
      Math.min(Math.round(grossPay / 500) * 500, this.maxThreshold),
      this.minThreshold
    );
    return {
      ER: Math.min(msc * this.ERrate, this.maxER) - prevContribution,
      EE: Math.min(msc * this.EErate, this.maxEE) - prevContribution,
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
  compute(basicPay, prevPHICconts) {
    const cont = basicPay * this.EErate;
    const min = Math.max(cont, this.minEE);
    const max = Math.min(min, this.maxEE) - prevPHICconts;
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
  compute(grossPay, prevContribution) {
    const msc = Math.min(grossPay, this.maxThreshold);
    return {
      EE: Math.min(msc * this.EErate(grossPay), this.maxEE(grossPay)) - prevContribution,
      ER: Math.min(msc * this.ERrate, this.maxER) - prevContribution,
    };
  }
}

//----------------------------WTX----------------------------
export function TAX(netTaxableIncome, prevWTX) {
  const annualTaxableIncome = netTaxableIncome * 12;
  const taxBracket = [
    { base: 0, rate: 0 },
    { base: 250000, rate: 0.2 },
    { base: 400000, rate: 0.25 },
    { base: 800000, rate: 0.3 },
    { base: 2000000, rate: 0.32 },
    { base: 8000000, rate: 0.35 },
  ];

  let tax = 0;
  for (let i = 0; i < taxBracket.length; i++) {
    if (annualTaxableIncome > taxBracket[i].base) {
      tax += (annualTaxableIncome - taxBracket[i].base) * taxBracket[i].rate;
    } else {
      break;
    }
  }

  return tax / 12 - prevWTX;
}
