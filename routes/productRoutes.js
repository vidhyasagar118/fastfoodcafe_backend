const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  getProductsByCategory,
  updateDiscount,
  updateProduct
} = require("../controllers/productController");

router.get("/", getProducts);

router.post("/add", addProduct);

router.delete("/:id", deleteProduct);

router.get(
  "/category/:category",
  getProductsByCategory
);

router.put(
  "/discount/:id",
  updateDiscount
);

router.put(
  "/:id",
  updateProduct
);

module.exports = router;