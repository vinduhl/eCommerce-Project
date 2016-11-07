const Order = require("./Order");

module.exports = {

  addOrder(req, res) {
    if(req.params.user_id) {
      req.body.user = req.params.user_id;
      new Order(req.body).save((err, order) => {
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(201).json(order);
      });
    }
  },

  getOrder(req, res) {
    if(req.query) {
      Order.find(req.query, (err, order) => {
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(order);
      });
    }
  }
};
