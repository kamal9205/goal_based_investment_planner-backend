const calculateMonthlySurplus = (
  monthlyIncome,
  monthlyExpenses
) => {
  return monthlyIncome - monthlyExpenses;
};

const calculateSavingsRate = (
  monthlyIncome,
  monthlyExpenses
) => {
  const surplus =
    calculateMonthlySurplus(
      monthlyIncome,
      monthlyExpenses
    );

  return (surplus / monthlyIncome) * 100;
};

const calculateEmergencyMonths = (
  currentSavings,
  monthlyExpenses
) => {
  return currentSavings / monthlyExpenses;
};

const getAgeScore = (age) => {
  if (age <= 30) return 10;
  if (age <= 40) return 8;
  if (age <= 50) return 6;
  if (age <= 60) return 4;
  return 2;
};

const getTimelineScore = (years) => {
  if (years < 3) return 2;
  if (years <= 5) return 4;
  if (years <= 10) return 7;
  return 10;
};

const getRiskScore = (riskProfile) => {
  switch (riskProfile.toLowerCase()) {
    case "low":
      return 2;

    case "medium":
      return 6;

    case "high":
      return 10;

    default:
      return 2;
  }
};

const getSurplusScore = (
  monthlyIncome,
  monthlyExpenses
) => {
  const savingsRate =
    calculateSavingsRate(
      monthlyIncome,
      monthlyExpenses
    );

  if (savingsRate < 10) return 2;
  if (savingsRate < 20) return 4;
  if (savingsRate < 30) return 6;
  if (savingsRate < 40) return 8;

  return 10;
};

const calculateInvestmentScore = ({
  age,
  goalTimeline,
  monthlyIncome,
  monthlyExpenses,
  riskProfile,
}) => {
  const ageScore = getAgeScore(age);

  const timelineScore =
    getTimelineScore(goalTimeline);

  const surplusScore =
    getSurplusScore(
      monthlyIncome,
      monthlyExpenses
    );

  const riskScore =
    getRiskScore(riskProfile);

  return (
    ageScore +
    timelineScore +
    surplusScore +
    riskScore
  );
};

const getPortfolioAllocation = (
  investmentScore
) => {
  if (investmentScore <= 15) {
    return {
      debt: 70,
      hybrid: 20,
      equity: 10,
    };
  }

  if (investmentScore <= 25) {
    return {
      debt: 50,
      hybrid: 20,
      equity: 30,
    };
  }

  if (investmentScore <= 35) {
    return {
      debt: 20,
      hybrid: 20,
      equity: 60,
    };
  }

  return {
    debt: 10,
    hybrid: 10,
    equity: 80,
  };
};

const calculateRequiredSIP = (
  goalAmount,
  annualReturn,
  years
) => {
  const r =
    annualReturn / 100 / 12;

  const n = years * 12;

  const sip =
    goalAmount /
    ((((Math.pow(1 + r, n) - 1) / r) *
      (1 + r)));

  return Math.ceil(sip);
};

module.exports = {
  calculateMonthlySurplus,
  calculateSavingsRate,
  calculateEmergencyMonths,
  calculateInvestmentScore,
  getPortfolioAllocation,
  calculateRequiredSIP,
};