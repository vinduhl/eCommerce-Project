const mongoose = require("mongoose");

const Cart = new mongoose.Schema( {

  products: [
    {
      product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      qty: {type: Number, min: 1}
    }]
});


module.exports = Cart;
