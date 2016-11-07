const mongoose = require("mongoose");

const Product = new mongoose.Schema( {

  name: {type: String, required: true, trim: true, minlength: 1},
  description: {type: String, required: true, trim: true, minlength: 1, maxlength: 30},
  type: {type: String, lowercase: true, enum: ["health", "electronics", "entertainment", "apparel"]},
  price: {type: Number, default: 0.00},
  onhand: {type: Number, default: 0}
});


module.exports = {
  product: mongoose.model("Product", Product),
  productSchema: Product
};
