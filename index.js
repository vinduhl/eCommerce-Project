const express = require("express");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./features/routes");

const app = express();
app.use(json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/ecommerce-project");
mongoose.connection.once("open", function() {
  console.log("Mongoose connected");
})

routes(app);


const port = 8800;

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
