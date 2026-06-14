const express = require("express");
const router = express.Router();

const LoginUser = require("../models/LoginUser");

router.get("/", async (req, res) => {
  try {
    const users = await LoginUser.find().sort({
      createdAt: -1,
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;