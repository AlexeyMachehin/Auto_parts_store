const Product = require("../models/productSchema");

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.send("OK");
  } catch (error) {
    
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить список товаров",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    req.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Товар не найден",
    });
  }
};

const createProduct = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: "Укажите название" };
  }

  if (!req.body.manufacturer) {
    errors.manufacturer = { message: "Укажите производителя" };
  }

  if (!req.body.quantity) {
    errors.quantity = { message: "Укажите количество" };
  }

  if (!req.body.unitOfMeasurement) {
    errors.unitOfMeasurement = { message: "Укажите единицу измерения" };
  }

  if (!req.body.wholesalePrice) {
    errors.wholesalePrice = { message: "Укажите оптовую цену" };
  }

  if (!req.body.retailPrice) {
    errors.retailPrice = { message: "Укажите розничную цену" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const {
      name,
      catalogueNumber,
      manufacturer,
      quantity,
      unitOfMeasurement,
      wholesalePrice,
      retailPrice,
    } = req.body;

    const product = await Product.create({
      name,
      catalogueNumber,
      manufacturer,
      quantity,
      unitOfMeasurement,
      wholesalePrice,
      retailPrice,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось создать товар",
    });
  }
};

const updateProduct = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: "Укажите название" };
  }

  if (!req.body.manufacturer) {
    errors.manufacturer = { message: "Укажите производителя" };
  }

  if (!req.body.quantity) {
    errors.quantity = { message: "Укажите количество" };
  }

  if (!req.body.unitOfMeasurement) {
    errors.unitOfMeasurement = { message: "Укажите единицу измерения" };
  }

  if (!req.body.wholesalePrice) {
    errors.wholesalePrice = { message: "Укажите оптовую цену" };
  }

  if (!req.body.retailPrice) {
    errors.retailPrice = { message: "Укажите розничную цену" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const {
      name,
      catalogueNumber,
      manufacturer,
      quantity,
      unitOfMeasurement,
      wholesalePrice,
      retailPrice,
    } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      catalogueNumber,
      manufacturer,
      quantity,
      unitOfMeasurement,
      wholesalePrice,
      retailPrice,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось обновить товар",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
