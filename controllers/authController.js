const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const LoginUser = require("../models/LoginUser");
const Admin = require("../models/Admin");

/* =========================
   Admin Login
========================= */

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      username,
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   Google Login
========================= */

const googleLogin = async (req, res) => {
  try {
    const {
      name,
      email,
      picture,
    } = req.body;

    let user = await LoginUser.findOne({
      email,
    });

    if (!user) {
      user = await LoginUser.create({
        name,
        email,
        picture,
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  adminLogin,
  googleLogin,
};