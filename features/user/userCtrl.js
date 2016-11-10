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
      User.findById(userId, (err, user) => {
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(user)
      })
    } else {
      User.find({}, (err, user) => {
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(user)
      });
    }
  }

};
