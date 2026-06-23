const mongoose =
  require("mongoose");

const investmentSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      investmentName: String,

      category: {
        type: String,
        enum: [
          "equity",
          "debt",
          "hybrid",
        ],
      },

      amount: Number,

      expectedReturn: Number,

      investmentDate: Date,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Investment",
    investmentSchema
  );