const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  getAnalysis
} = require(
  "../controllers/profileController"
);

router.get(
  "/",
  protect,
  getProfile
);

router.put(
  "/",
  protect,
  updateProfile
);

router.get(
  "/analysis",
  protect,
  getAnalysis
);

module.exports = router;