// controllers/dashboardController.js

const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalCustomers = await User.countDocuments();

    const ordersToday = await Order.countDocuments({
      createdAt: {
        $gte: new Date(
          new Date().setHours(0, 0, 0, 0)
        ),
      },
    });

    const orders = await Order.find({
      status: "Delivered",
    });

    const revenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    res.json({
      totalProducts,
      ordersToday,
      revenue,
      totalCustomers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getDashboardStats };