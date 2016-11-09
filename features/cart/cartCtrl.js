const User = require("../user/User");

module.exports = {

  addItemToCart(req, res) {
    if(req.params.user_id) {

      if(!req.body.item) {
        return res.status(500).json({message: "Missing 'item' node in req.body to add to cart"});
      }
      if(!req.body.item.product || !req.body.item.qty) {
        return res.status(500).json({message: "Missing 'item.product' or 'item.qty' node in req.body to add to cart"});
      }

      const userId = req.params.user_id;
      User.findByIdAndUpdate(userId, {$push: {"cart": req.body} }, (err, user) => {
        if(err) {
          return res.status(500).json(err);
        }
        if(user) {
          User.findById(userId, (err, user) => {
            if(err) {
              return res.status(500).json(err);
            }
            if(user) {
              return res.status(201).json(user.cart);
            } else {
              return res.status(200).json( {message: `Cannot find userId ${userId} for update.`});
            }
          });
        }
      });
    }
  },


  updateItemInCart(req, res) {


    let isChanged = false;
    if(req.params.user_id) {
      const cartId = req.body.cartId;
      const userId = req.params.user_id;

      User.findById(userId, (err, user) => {
        if(err) {
          return res.status(500).json(err);
        }
        if(!user) {
          return res.status(400).json(`Cannot find user with id ${userId}`);
        }

        user.cart.forEach( (cartItem) => {
          if(String(cartItem._id) === String(cartId)) {
            cartItem.item.qty = req.body.qty;
            isChanged = true;
          }
        });

        if(isChanged) {
          user.markModified("cart");
          user.save();
          return res.status(200).json(user.cart);
        } else {
          return res.status(200).json({message: `Change not made for user with id ${userId}` });
        }
      });
    } else {
      return res.status(500).json( {message: "User Id is required" });
    }

  }

};
