const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getUserOrders,
  updateStatus,
} = require("../controllers/orderController");

router.get(
  "/user/:email",
  getUserOrders
);
router.post("/place", placeOrder);
router.get("/", getOrders);
router.put("/:id", updateStatus);

module.exports = router;