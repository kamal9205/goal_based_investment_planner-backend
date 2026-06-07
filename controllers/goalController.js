const Goal = require("../models/Goal");
const {
    calculateGoalProgress,
    calculateRemainingAmount,
    calculateGoalTimeline,
} = require("../services/goalService");

const asyncHandler = require("../utils/asyncHandler");
const { ApiError } = require("../utils/apiError");
const { ApiResponse } = require("../utils/apiResponse");

const createGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.create({
        ...req.body,
        userId: req.user,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            goal,
            "Goal created successfully"
        )
    );
});

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({
        userId: req.user,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            goals,
            "Goals fetched successfully"
        )
    );
});

const getGoalById = asyncHandler(async (req, res) => {
    const goal = await Goal.findOne({
        _id: req.params.id,
        userId: req.user,
    });

    if (!goal) {
        throw new ApiError(404, "Goal not found");
    }

    const progress = calculateGoalProgress({
        goalAmount: goal.goalAmount,
        currentAmount: goal.currentAmount,
    });

    const remaining = calculateRemainingAmount({
        goalAmount: goal.goalAmount,
        currentAmount: goal.currentAmount,
    });

    const timeline = calculateGoalTimeline({
        goalAmount: goal.goalAmount,
        currentAmount: goal.currentAmount,
        monthlyInvestment: goal.monthlyInvestment,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                ...goal.toObject(),
                progress,
                remaining,
                timeline,
            },
            "Goal fetched successfully"
        )
    );
});

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findOneAndUpdate(
        {
            _id: req.params.id,
            userId: req.user,
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!goal) {
        throw new ApiError(404, "Goal not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            goal,
            "Goal updated successfully"
        )
    );
});

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findOneAndDelete({
        _id: req.params.id,
        userId: req.user,
    });

    if (!goal) {
        throw new ApiError(404, "Goal not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Goal deleted successfully"
        )
    );
});

module.exports = {
    createGoal,
    getGoals,
    getGoalById,
    updateGoal,
    deleteGoal,
};