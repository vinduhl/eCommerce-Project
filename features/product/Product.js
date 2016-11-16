const mongoose = require("mongoose");
const enumProductTypes = require("./productConfig");

const Product = new mongoose.Schema( {

  name: {type: String, required: true, trim: true, minlength: 1},
  description: {type: String, required: true, trim: true, minlength: 1, maxlength: 30},
  type: {type: String, lowercase: true, enum: enumProductTypes},
  price: {type: Number, default: 0.00},
  onhand: {type: Number, default: 0},
  imageUrl: {type: String, trim: true, default: "", maxlength: 200},
});


module.exports = {
  Product: mongoose.model("Product", Product),
  productSchema: Product,
  enumProductTypes: enumProductTypes
};
