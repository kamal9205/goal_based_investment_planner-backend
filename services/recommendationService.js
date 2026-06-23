const getRecommendations = ({
  age,
  monthlySurplus,
  riskProfile,
  goalYears,
  investmentScore,
}) => {
  if (
    age < 35 &&
    monthlySurplus > 20000 &&
    riskProfile === "high" &&
    goalYears >= 10 &&
    investmentScore >= 25
  ) {
    return {
      riskCategory: "Aggressive",

      expectedReturn: 14,

      recommendedAllocation: {
        equity: 80,
        debt: 10,
        hybrid: 10,
      },

      recommendedFunds: [
        "Nifty 50 Index Fund",
        "Flexi Cap Fund",
        "Mid Cap Fund",
      ],

      rationale:
        "Your young age, strong monthly surplus, long investment horizon, and high risk tolerance support a growth-focused portfolio with higher equity exposure.",
    };
  }

  if (
    age < 50 &&
    monthlySurplus > 10000 &&
    investmentScore >= 18
  ) {
    return {
      riskCategory: "Moderate",

      expectedReturn: 11,

      recommendedAllocation: {
        equity: 60,
        debt: 20,
        hybrid: 20,
      },

      recommendedFunds: [
        "Nifty 50 Index Fund",
        "Large Cap Fund",
        "Balanced Advantage Fund",
      ],

      rationale:
        "You have a healthy surplus and moderate investment profile. A balanced allocation can help achieve long-term growth while controlling volatility.",
    };
  }

  return {
    riskCategory: "Conservative",

    expectedReturn: 7,

    recommendedAllocation: {
      equity: 30,
      debt: 50,
      hybrid: 20,
    },

    recommendedFunds: [
      "Debt Fund",
      "Liquid Fund",
      "Short Duration Fund",
    ],

    rationale:
      "Capital preservation appears more important than aggressive growth. A debt-oriented portfolio may provide stability with lower risk.",
  };
};

module.exports = {
  getRecommendations,
};