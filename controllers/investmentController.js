const {
    calculateMonthlySurplus,
    calculateSavingsRate,
    calculateEmergencyMonths,
    calculateInvestmentScore,
    getPortfolioAllocation,
    calculateRequiredSIP,
} = require("../services/investmentPlannerService");

const asyncHandler = require("../utils/asyncHandler");
const { ApiError } = require("../utils/apiError");
const { ApiResponse } = require("../utils/apiResponse");

const generatePlan = asyncHandler(async (req, res) => {
    const {
        age,
        monthlyIncome,
        monthlyExpenses,
        currentSavings,
        goalAmount,
        goalTimeline,
        riskProfile,
    } = req.body;

    if (
        !age ||
        !monthlyIncome ||
        !monthlyExpenses ||
        !goalAmount ||
        !goalTimeline ||
        !riskProfile
    ) {
        throw new ApiError(
            400,
            "All required fields must be provided"
        );
    }

    const monthlySurplus = calculateMonthlySurplus(
        monthlyIncome,
        monthlyExpenses
    );

    const savingsRate = calculateSavingsRate(
        monthlyIncome,
        monthlyExpenses
    );

    const emergencyMonths = calculateEmergencyMonths(
        currentSavings || 0,
        monthlyExpenses
    );

    const investmentScore = calculateInvestmentScore({
        age,
        goalTimeline,
        monthlyIncome,
        monthlyExpenses,
        riskProfile,
    });

    const portfolioAllocation =
        getPortfolioAllocation(investmentScore);

    const requiredMonthlySIP =
        calculateRequiredSIP(
            goalAmount,
            12,
            goalTimeline
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                monthlySurplus,
                savingsRate: Number(
                    savingsRate.toFixed(2)
                ),
                emergencyMonths: Number(
                    emergencyMonths.toFixed(2)
                ),
                investmentScore,
                portfolioAllocation,
                requiredMonthlySIP,
            },
            "Investment plan generated successfully"
        )
    );
});

module.exports = {
    generatePlan,
};