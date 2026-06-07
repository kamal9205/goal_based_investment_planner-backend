const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    goalName: {
      type: String,
      required: true
    },

    goalAmount: {
      type: Number,
      required: true
    },

    currentAmount: {
      type: Number,
      default: 0
    },

    targetDate: {
      type: Date,
      required: true
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"]
    },

    status: {
      type: String,
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Goal", goalSchema);