const express = require("express");

const {
  generatePlan,
} = require("../controllers/investmentController");



const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/generate-plan",
  protect,
  generatePlan
);

// router.post("/", protect, createInvestment);

// router.get("/", protect, getInvestments);

// router.get("/:id", protect, getInvestment);

// router.put("/:id", protect, updateInvestment);

// router.delete("/:id", protect, deleteInvestment);

module.exports = router;