const Goal = require("../models/Goal");
const {
  calculateInvestmentAnalysis,
} = require(
  "./investmentScoreService"
);

const getDashboardSummary = async (
  user
) => {
  const goals = await Goal.find({
    userId: user._id,
  });

  const analysis = calculateInvestmentAnalysis(user);

  const activeGoals =
    goals.filter(
      (goal) => goal.status === "active"
    ).length;

  const totalGoalAmount =
    goals.reduce(
      (sum, goal) =>
        sum + goal.goalAmount,
      0
    );

  const monthlyInvestment = 
    goals.reduce(
        (sum, goal) => 
            sum + Number(goal.monthlyInvestment || 0),
        0
    );

    return {
      activeGoals,
      totalGoalAmount,
      monthlyInvestment,

      monthlySurplus:
        analysis.monthlySurplus,

      investmentScore:
        analysis.investmentScore,

      riskCategory:
        analysis.riskCategory,

      goals,
    };
};

module.exports = {
  getDashboardSummary,
};