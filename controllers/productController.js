const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
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
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  getProductsByCategory,
  updateDiscount,
  updateProduct
};