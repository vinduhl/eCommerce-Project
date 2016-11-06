const controller = require("./userCtrl");

module.exports = (app) => {

  app.post("/api/user", controller.addUser);
  app.get("/api/user/:id", controller.getUser);
  app.get("/api/user", controller.getUser);

};
