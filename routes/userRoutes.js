const express = require("express");
const protect = require("../middleware/authMiddleware");
const {getAnalysis, getProfile, updateProfile} = require("../controllers/profileController");

const router = express.Router();

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



module.exports = router;