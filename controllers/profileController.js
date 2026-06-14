const User = require("../models/User");
const { calculateInvestmentAnalysis } = require( "../services/investmentScoreService" );

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

module.exports = {
  updateProfile,
  getProfile,
  getAnalysis,
};
