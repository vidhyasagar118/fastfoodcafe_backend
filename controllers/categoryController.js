const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const addCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
};

const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.json({
    message: "Category Deleted",
  });
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
};