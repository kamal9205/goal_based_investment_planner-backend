const express = require("express");
const protect = require("../middleware/authMiddleware");
const {getAnalysis, getProfile, updateProfile, getRecommendationsController,} = require("../controllers/profileController");

const router = express.Router();
console.log("userRoutes loaded");
router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.get(
  "/analysis",
  protect,
  getAnalysis
);

router.get(
  "/recommendations",
  protect,
  getRecommendationsController
);

module.exports = router;