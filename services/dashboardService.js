const Goal = require("../models/Goal");

const getDashboardSummary = async (
  userId
) => {
  const goals = await Goal.find({
    userId,
  });

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
    goals,
  };
};

module.exports = {
  getDashboardSummary,
};