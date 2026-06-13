const express = require("express");

const router = express.Router();

const {
  adminLogin,
  googleLogin,
} = require("../controllers/authController");

router.post(
  "/google-login",
  googleLogin
);

router.post(
  "/admin-login",
  adminLogin
);

module.exports = router;