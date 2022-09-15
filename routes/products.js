const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productsControllers");
const path = require("path");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)

module.exports = router;
