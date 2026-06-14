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
    age: {
      type: Number,
    }, 

    monthlyExpenses: {
      type: Number,
      default: 0,
    },

    currentSavings: {
      type: Number,
      default: 0,
    },

    emergencyFund: {
      type: Number,
      default: 0,
    },

    riskAppetite: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    dependents: {
      type: Number,
      default: 0,
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