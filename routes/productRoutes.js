const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  getProductsByCategory,
  updateDiscount,
  updateProduct,
  addReview,
  getProductById,
  incrementView,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get(
  "/category/:category",
  getProductsByCategory
);

// ADD THIS
router.get("/:id", getProductById);

router.post("/add", addProduct);

router.post(
  "/review/:id",
  addReview
);
router.put("/view/:id", incrementView);
router.put("/discount/:id", updateDiscount);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);
module.exports = router;