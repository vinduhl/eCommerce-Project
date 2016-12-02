const UserCredential = require("./UserCredential");
const User = require("../user/User");
const jwt = require("jsonwebtoken");
const config = require("../../config");

let secret = null;

module.exports = {

  loginUser(req, res) {
    const emailAddress = req.body.email_address;
    const password = req.body.password;

    console.log(emailAddress, password);
    UserCredential.findOne({ "email_address": emailAddress, "password": password }, (err, userCredential) => {
      if(err) {
        return res.status(500).json(err);
      } else {

        if(!userCredential) {
          return res.status(401).json({ message: "Login failed."});
        }
        User.findOne({ "email_address": emailAddress }, (err, user) => {
          if(err) {
            return res.status(500).json(err);
          } else {
            const token = jwt.sign(user, config.secret, {
              expiresIn: "1440m"
            });
            return res.status(200).json({ data: user, token: token });
          }
        });
      }
    });

  },

  createUserCredential(req, res) {
    new UserCredential(req.body).save((err, userCredential) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(userCredential);
    });
  }

};
