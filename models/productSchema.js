const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
  name: { type: String, required: true },
  catalogueNumber: { type: String, required: false },
  id: { type: Number, required: false },
  manufacturer: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitOfMeasurement: { type: String, required: true },
  wholesalePrice: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
}

,{
  versionKey: false 
}
);

module.exports = mongoose.model("Product", productSchema);
