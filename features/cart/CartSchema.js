const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    qty: {type: Number, min: 1}
  }
);


module.exports = Cart;
