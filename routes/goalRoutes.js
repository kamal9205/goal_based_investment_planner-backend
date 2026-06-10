const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.route("/")
        .post( protect, createGoal)
        .get(protect, getGoals);

router.route("/:id")
    .get( protect, getGoalById)
    .put( protect, updateGoal)
    .delete( protect, deleteGoal);

module.exports = router;