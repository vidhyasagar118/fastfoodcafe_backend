// routes/productStatsRoutes.js

const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/bestseller", async (req, res) => {
  const orders = await Order.find();

  const counts = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!counts[item._id]) {
        counts[item._id] = {
          ...item,
          sold: 0,
        };
      }

      counts[item._id].sold += item.qty;
    });
  });

  const products = Object.values(counts)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 6);

  res.json(products);
});

module.exports = router;