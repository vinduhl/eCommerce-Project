const User = require("./User");

module.exports = {

  addUser(req, res) {
    new User(req.body).save((err, user) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(user);
    });

  },

  getUser(req, res) {
    const userId = req.params.id;
    let promise;
    if(userId) {
      promise = User.findById(userId);
    } else {
      promise = User.find();
    }
    promise.then((err, user) => {
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(user);
      });
  }

};
