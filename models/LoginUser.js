const mongoose = require("mongoose");

const loginUserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    picture: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "LoginUser",
  loginUserSchema
);