const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const now = new Date();

    const updatedProducts = products.map((p) => {
      const product = p.toObject();

      if (
        product.discountStart &&
        product.discountEnd &&
        (now < new Date(product.discountStart) ||
          now > new Date(product.discountEnd))
      ) {
        product.discount = 0;
      }

      return product;
    });

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

    const now = new Date();

    const updatedProducts = products.map((p) => {
      const product = p.toObject();

      if (
        product.discountStart &&
        product.discountEnd &&
        (
          now < new Date(product.discountStart) ||
          now > new Date(product.discountEnd)
        )
      ) {
        product.discount = 0;
      }

      return product;
    });

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const addProduct = async (req, res) => {

  try {
    console.log("BODY =", req.body);

    const product =
      await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {
    console.log("PRODUCT ERROR =", error);

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const updateDiscount =
async (req,res)=>{

  const product =
  await Product.findByIdAndUpdate(
    req.params.id,
    {
      discount:req.body.discount
    },
    {new:true}
  );

  res.json(product);
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const addReview = async (req, res) => {
  try {
    const Order = require("../models/Order");

    const product = await Product.findById(req.params.id);

    const {
      userName,
      email,
      rating,
      comment,
    } = req.body;

    // Check Delivered Order
    const deliveredOrder = await Order.findOne({
      email,
      status: "Delivered",
      "items._id": req.params.id,
    });

    if (!deliveredOrder) {
      return res.status(400).json({
        message:
          "You can review only purchased products",
      });
    }

    const alreadyReviewed =
      product.reviews.find(
        (r) => r.email === email
      );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "Already Reviewed",
      });
    }

    product.reviews.push({
      userName,
      email,
      rating,
      comment,
    });

    product.numReviews =
      product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getProductById = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product){
      return res.status(404).json({
        message:"Product not found"
      });
    }

    res.json(product);
  } catch(err){
    res.status(500).json({
      message: err.message
    });
  }
};

const incrementView = async (req, res) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          $inc: {
            views: 1,
          },
        },
        {
          new: true,
        }
      );

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  getProductsByCategory,
  updateDiscount,
  updateProduct,
  addReview,
  getProductById,
  incrementView,
};