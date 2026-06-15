const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");

router.get("/bestseller", async (req, res) => {
  try {
    const orders = await Order.find();

    const counts = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!counts[item._id]) {
          counts[item._id] = 0;
        }

        counts[item._id] += item.qty;
      });
    });

    const productIds = Object.keys(counts);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    const result = products.map((product) => ({
      ...product.toObject(),
      sold: counts[product._id.toString()] || 0,
    }));

    result.sort((a, b) => b.sold - a.sold);

    res.json(result.slice(0, 6));
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;