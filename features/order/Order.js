const mongoose = require("mongoose");
const {productSchema} = require("../product/Product");

const Order = new mongoose.Schema( {

  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  products: [{
    product: productSchema,
    qty: {type: Number, required: true, min: 1}
  }],
  date_ordered: {type: Date, default: new Date()}
});


module.exports = mongoose.model("Order", Order);
