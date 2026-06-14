const calculateInvestmentAnalysis = (
  profile
) => {
  const monthlySurplus =
    profile.monthlyIncome -
    profile.monthlyExpenses;

  const savingsRate =
    profile.monthlyIncome > 0
      ? Number(
          (
            (monthlySurplus /
              profile.monthlyIncome) *
            100
          ).toFixed(2)
        )
      : 0;

  const emergencyMonths =
    profile.monthlyExpenses > 0
      ? Number(
          (
            profile.currentSavings /
            profile.monthlyExpenses
          ).toFixed(1)
        )
      : 0;

  let ageScore = 0;

  if (profile.age <= 30)
    ageScore = 10;
  else if (profile.age <= 40)
    ageScore = 8;
  else if (profile.age <= 50)
    ageScore = 6;
  else if (profile.age <= 60)
    ageScore = 4;
  else ageScore = 2;

  let surplusScore = 0;

  if (savingsRate < 10)
    surplusScore = 2;
  else if (savingsRate < 20)
    surplusScore = 4;
  else if (savingsRate < 30)
    surplusScore = 6;
  else if (savingsRate < 40)
    surplusScore = 8;
  else surplusScore = 10;

  const riskScore = {
    low: 2,
    medium: 6,
    high: 10,
  }[profile.riskAppetite];

  const investmentScore =
    ageScore +
    surplusScore +
    riskScore;

  let allocation;

  if (investmentScore <= 15) {
    allocation = {
      debt: 70,
      hybrid: 20,
      equity: 10,
    };
  } else if (
    investmentScore <= 25
  ) {
    allocation = {
      debt: 50,
      hybrid: 20,
      equity: 30,
    };
  } else if (
    investmentScore <= 35
  ) {
    allocation = {
      debt: 20,
      hybrid: 20,
      equity: 60,
    };
  } else {
    allocation = {
      debt: 10,
      hybrid: 10,
      equity: 80,
    };
  }

  return {
    monthlySurplus,
    savingsRate,
    emergencyMonths,
    investmentScore,

    riskCategory:
      investmentScore >= 30
        ? "Aggressive"
        : investmentScore >= 20
        ? "Moderate"
        : "Conservative",

    recommendedAllocation:
      allocation,
  };
};

module.exports = {
  calculateInvestmentAnalysis,
};