const express = require("express");
const router = express.Router();
const { getProducts, createProduct, getProduct } = require("../controllers/productsControllers");
const path = require("path");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);

module.exports = router;