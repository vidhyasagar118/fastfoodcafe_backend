const Order = require("../models/Order");
const Product = require("../models/Product");
const placeOrder = async (req, res) => {
  try {

    // Stock Check
    for (const item of req.body.items) {

      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `${product.name} Out Of Stock`,
        });
      }
    }

    // Create Order
    const order = await Order.create(req.body);

    // Reduce Stock
    for (const item of req.body.items) {
      await Product.findByIdAndUpdate(
        item._id,
        {
         $inc: {
  stock: -item.qty,
  soldCount: item.qty,
}
        }
      );
    }

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      email: req.params.email,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getUserOrders,
  updateStatus,
};