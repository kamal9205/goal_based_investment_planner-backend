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

router.post("/", protect, createGoal);
router.get("/", protect, getGoals);

router.get("/:id", protect, getGoalById);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;