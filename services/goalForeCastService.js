const calculateGoalForecast = (
  goal
) => {
  const {
    goalAmount,
    currentAmount,
    monthlyInvestment,
  } = goal;

  const remainingAmount =
    goalAmount - currentAmount;

  if (
    !monthlyInvestment ||
    monthlyInvestment <= 0
  ) {
    return {
      remainingAmount,
      estimatedMonths: null,
      estimatedYears: null,
      onTrack: false,
    };
  }

  const estimatedMonths =
    Math.ceil(
      remainingAmount /
        monthlyInvestment
    );

  const estimatedYears = (
    estimatedMonths / 12
  ).toFixed(1);

  const targetDate =
    new Date(goal.targetDate);

  const today = new Date();

  const monthsRemaining =
    (targetDate.getFullYear() -
      today.getFullYear()) *
      12 +
    (targetDate.getMonth() -
      today.getMonth());

  const onTrack =
    estimatedMonths <=
    monthsRemaining;

  return {
    remainingAmount,
    estimatedMonths,
    estimatedYears,
    onTrack,
  };
};

module.exports = {
  calculateGoalForecast,
};