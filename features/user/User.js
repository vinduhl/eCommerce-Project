const mongoose = require("mongoose");
const cartSchema = require("../cart/CartSchema");

const User = new mongoose.Schema( {
  firstname:{type: String, required: true, trim: true, minlength: 1},
  lastname: {type: String, required: true, trim: true, minlength: 1},
  email_address: {type: String, required: true, lowercase: true, trim: true, minlength: 1, maxlength: 30},
  cart: [cartSchema]
});

module.exports = mongoose.model("User", User);
