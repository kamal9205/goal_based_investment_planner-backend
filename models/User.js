const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    monthlyIncome: {
      type: Number,
      default: 0,
    },

    monthlyExpenses: {
      type: Number,
      default: 0,
    },

    riskProfile: {
      type: String,
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);