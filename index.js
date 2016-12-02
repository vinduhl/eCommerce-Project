const express = require("express");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./features/product/productRoutes");
const userRoutes = require("./features/user/userRoutes");
const orderRoutes = require("./features/order/orderRoutes");
const cartRoutes = require("./features/cart/cartRoutes");
const userCredentialRoutes = require("./features/credential/userCredentialRoutes");

const app = express();
app.use(json());
app.use(cors());

app.use(express.static("./public"));

mongoose.connect("mongodb://localhost:27017/ecommerce-project");
mongoose.connection.once("open", function() {
  console.log("Mongoose connected");
});

// Set up routes
productRoutes(app);
userRoutes(app);
orderRoutes(app);
cartRoutes(app);
userCredentialRoutes(app);

const port = 8800;

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
