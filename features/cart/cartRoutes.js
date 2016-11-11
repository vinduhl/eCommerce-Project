const controller = require("./cartCtrl");

module.exports = (app) => {

  app.post("/api/cart/:user_id", controller.addItemToCart);
  app.put("/api/cart/:user_id", controller.updateItemInCart);
  app.get("/api/cart/:user_id", controller.getCart);
};
