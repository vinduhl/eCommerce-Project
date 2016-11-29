const UserCredential = require("./UserCredential");
const User = require("./User");


module.exports = {

  loginUser(req, res) {
    const emailAddress = req.body.emailaddress;
    const password = req.body.password;

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
            return res.status(200).json(user);
          }
        });
      }
    });

  }

};
