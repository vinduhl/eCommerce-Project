const controller = require("./UserCredentialCtrl");

module.exports = (app) => {

  app.post("/api/login", controller.loginUser);
  //app.post("/api/logout", controller.logoutUser);

};
