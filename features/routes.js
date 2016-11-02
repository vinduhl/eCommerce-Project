const controller = require("./controller");

module.exports = app => {

  app.post("/api/products", controller.addProduct);

  app.get("/api/products/:id", controller.getProduct);
  app.get("/api/products", controller.getProduct);

  app.put("/api/products/:id", controller.updateProduct);

  app.delete("/api/products/:id", controller.deleteProduct);

}
