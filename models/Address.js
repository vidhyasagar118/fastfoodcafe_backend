const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  email: String,
  type: String,

  house: String,
  road: String,
  city: String,
  district: String,
  state: String,
  pincode: String,
});

module.exports = mongoose.model(
  "Address",
  addressSchema
);