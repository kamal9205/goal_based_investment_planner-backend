const asyncHandler = require("../utils/asyncHandler");
const { getDashboardSummary } = require("../services/dashboardService");
const { ApiResponse } = require("../utils/apiResponse");

const getDashboard = asyncHandler(async (req, res) => {
    const data = await getDashboardSummary(req.user);

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Dashboard data fetched successfully"
        )
    );
});

module.exports = {
    getDashboard,
};