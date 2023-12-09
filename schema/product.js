const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productType: String,
  productCategory: String,
  productSize: [String],
  productGender: String,
  productPrice: Number,
  productQuantity: Number,
  productColor: String, 
  productImages: [{ type: String }], 
  productDescription: String,
  
});

const product = mongoose.model("product", productSchema);

module.exports = product;
