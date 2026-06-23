const Goal = require("../models/Goal");

const {
  calculateInvestmentAnalysis,
} = require(
  "../services/investmentScoreService"
);

const {
  getRecommendations,
} = require(
  "../services/recommendationService"
);

const {
  askAdvisor,
} = require(
  "../services/aiAdvisorService"
);

const asyncHandler =
  require("../utils/asyncHandler");

const askQuestion = asyncHandler(
  async (req, res) => {
    const { question } = req.body;

    const goals =
      await Goal.find({
        userId: req.user._id,
      });

    const analysis =
      calculateInvestmentAnalysis(
        req.user
      );

    const recommendations =
      getRecommendations({
        age: req.user.age,
        monthlySurplus:
          analysis.monthlySurplus,
        riskProfile:
          req.user.riskAppetite,
        goalYears: 10,
        investmentScore:
          analysis.investmentScore,
      });

    const answer =
      await askAdvisor({
        profile: req.user,
        goals,
        analysis,
        recommendations,
        question,
      });

    res.status(200).json({
      success: true,
      answer,
    });
  }
);

module.exports = {
  askQuestion,
};