const calculateInvestmentAnalysis = (
  user
) => {
  const monthlyIncome =
    user.monthlyIncome || 0;

  const monthlyExpenses =
    user.monthlyExpenses || 0;

  const emergencyFund =
    user.emergencyFund || 0;

  const age = user.age || 18;

  const riskAppetite =
    user.riskAppetite || "medium";

  const monthlySurplus =
    monthlyIncome -
    monthlyExpenses;

  const savingsRate =
    monthlyIncome > 0
      ? Number(
          (
            (monthlySurplus /
              monthlyIncome) *
            100
          ).toFixed(2)
        )
      : 0;

  const emergencyMonths =
    monthlyExpenses > 0
      ? Number(
          (
            emergencyFund /
            monthlyExpenses
          ).toFixed(1)
        )
      : 0;

  let ageScore = 0;

  if (age <= 30) ageScore = 10;
  else if (age <= 40)
    ageScore = 8;
  else if (age <= 50)
    ageScore = 6;
  else if (age <= 60)
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

  let riskScore = 0;

  if (riskAppetite === "low")
    riskScore = 2;

  if (riskAppetite === "medium")
    riskScore = 6;

  if (riskAppetite === "high")
    riskScore = 10;

  const investmentScore =
    ageScore +
    surplusScore +
    riskScore;

  let riskCategory =
    "Conservative";

  let recommendedAllocation =
    {
      equity: 20,
      debt: 60,
      hybrid: 20,
    };

  if (investmentScore >= 20) {
    riskCategory = "Moderate";

    recommendedAllocation =
      {
        equity: 60,
        debt: 20,
        hybrid: 20,
      };
  }

  if (investmentScore >= 28) {
    riskCategory = "Aggressive";

    recommendedAllocation =
      {
        equity: 80,
        debt: 10,
        hybrid: 10,
      };
  }

  return {
    monthlySurplus,
    savingsRate,
    emergencyMonths,
    investmentScore,
    riskCategory,
    recommendedAllocation,
  };
};

module.exports = {
  calculateInvestmentAnalysis,
};