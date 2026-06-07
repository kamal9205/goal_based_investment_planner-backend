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

module.exports = router;