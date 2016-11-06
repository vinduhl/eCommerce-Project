const User = require("../user/User");

module.exports = {

  addItemToCart(req, res) {
    if(req.params.user_id) {
      const userId = req.params.user_id;
      User.findByIdAndUpdate(userId, {$push: {cart: req.body} })
      .then((err, user) => {
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(201).json(user.cart);
      });
    }
  },

  // updateItemInCart(req, res) {
  //   if(req.params.user_id) {
  //     req.body.user = req.params.user_id;
  //     new Order(req.body).save((err, order) => {
  //       if(err) {
  //         return res.status(500).json(err);
  //       }
  //       return res.status(201).json(order);
  //     });
  //   }
  // }

};
