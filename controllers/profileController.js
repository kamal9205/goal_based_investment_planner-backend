const User = require("../models/User");
const { calculateInvestmentAnalysis } = require( "../services/investmentScoreService" );

const {
  getRecommendations
} = require(
  "../services/recommendationService"
);

const Goal = require("../models/Goal");

const asyncHandler =
  require("../utils/asyncHandler");

const { ApiResponse } =
  require("../utils/apiResponse");

const updateProfile = asyncHandler(
  async (req, res) => {
    const {
      age,
      monthlyIncome,
      monthlyExpenses,
      currentSavings,
      emergencyFund,
      dependents,
      riskAppetite,
    } = req.body;

    const user =
      await User.findByIdAndUpdate(
        req.user._id,
        {
          age,
          monthlyIncome,
          monthlyExpenses,
          currentSavings,
          emergencyFund,
          dependents,
          riskAppetite,
        },
        {
          new: true,
        }
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        user,
        "Profile updated successfully"
      )
    );
  }
);


const getProfile =
  asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        req.user,
        "Profile fetched successfully"
      )
    );
  });

  

const getAnalysis =
  asyncHandler(
    async (req, res) => {
      const analysis =
        calculateInvestmentAnalysis(
          req.user
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            analysis,
            "Investment analysis generated"
          )
        );
    }
  );

  const getRecommendationsController =
  async (req, res) => {
    const analysis =
      calculateInvestmentAnalysis(
        req.user
      );

    const goals = await Goal.find({
      userId: req.user._id,
    });

    let goalYears = 0;

    if (goals.length > 0) {
      const longestGoal =
        Math.max(
          ...goals.map((goal) => {
            const years =
              (
                new Date(
                  goal.targetDate
                ) -
                new Date()
              ) /
              (1000 *
                60 *
                60 *
                24 *
                365);

            return years;
          })
        );

      goalYears =
        Math.max(
          1,
          Math.round(longestGoal)
        );
    }

    const recommendations =
      getRecommendations({
        age: req.user.age || 30,

        monthlySurplus:
          analysis.monthlySurplus,

        riskProfile:
          req.user.riskAppetite ||
          "medium",

        goalYears,

        investmentScore:
          analysis.investmentScore,
      });

    return res.status(200).json({
      success: true,
      data: recommendations,
    });
  };

module.exports = {
  getProfile,
  updateProfile,
  getAnalysis,
  getRecommendationsController,
};
