const controller = require("./orderCtrl");

module.exports = (app) => {

  app.post("/api/order/:user_id", controller.addOrder);
  //app.get("/api/order/", controller.getOrder);

};
