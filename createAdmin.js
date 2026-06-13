const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function createAdmin() {
  try {
    const hash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: hash,
    });

    console.log("✅ Admin Created");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit();
  }
}

createAdmin();