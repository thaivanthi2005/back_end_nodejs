const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expiresAt: {
      type: Date,
      expires: 10, //sau 10s tự động mất
    },
  },
  {
    timestamps: true,
  },
);

const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot-password",
);

module.exports = ForgotPassword;
