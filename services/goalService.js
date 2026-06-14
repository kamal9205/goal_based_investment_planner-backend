const calculateGoalProgress = ({
  goalAmount,
  currentAmount,
}) => {
  const percentage =
    (currentAmount / goalAmount) * 100;

  return Math.min(
    Number(percentage.toFixed(2)),
    100
  );
};

const calculateRemainingAmount = ({
  goalAmount,
  currentAmount,
}) => {
  return Math.max(
    goalAmount - currentAmount,
    0
  );
};

const calculateGoalTimeline = ({
  goalAmount,
  currentAmount,
  monthlyInvestment,
  expectedReturn = 12,
}) => {
  const monthlyRate =
    expectedReturn / 100 / 12;

  let corpus = currentAmount;
  let months = 0;

  while (corpus < goalAmount) {
    corpus =
      (corpus + monthlyInvestment) *
      (1 + monthlyRate);

    months++;

    if (months > 1200) break;
  }

  return {
    months,
    years: Number(
      (months / 12).toFixed(1)
    ),
  };
};

module.exports = {
  calculateGoalProgress,
  calculateRemainingAmount,
  calculateGoalTimeline,
};