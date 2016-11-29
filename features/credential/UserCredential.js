const mongoose = require("mongoose");

const UserCredential = new mongoose.Schema( {
  email_address: {type: String, required: true, lowercase: true, trim: true, minlength: 1, maxlength: 80},
  password: {type: String, required: true, trim: true, minlength: 5, maxlength: 20},
  is_admin: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model("UserCredential", UserCredential);
