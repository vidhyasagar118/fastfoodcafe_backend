const express = require("express");
const router = express.Router();

const {
  saveAddress,
  getAddresses,
} = require("../controllers/addressController");

router.post("/save", saveAddress);
router.get("/:email", getAddresses);

module.exports = router;