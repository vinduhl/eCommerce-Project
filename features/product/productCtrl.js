const { Product, enumProductTypes } = require("./Product");

module.exports = {

  addProduct(req, res) {
    new Product(req.body).save((err, product) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(product);
    });

  },

  getProduct(req, res) {
    const productId = req.params.id;
    if(productId) {
      Product.findById(productId, (err, product) => {
        if(err) {
          return res.status(500).json(err);
        }
        // package product into array so client can expect an array regardless
        return res.status(200).json([product]);
      });
    } else {
      if(req.query.name) {
        req.query.name = {"$regex": req.query.name, "$options" : "i"};
      }
      Product.find(req.query, (err, products) => {
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(products);
      });
    }
  },

  updateProduct(req, res) {
    const productId = req.params.id;
    if(productId) {
      Product.findByIdAndUpdate(productId, req.body, (err, product) => {
        if(err) {
          return res.status(500).json(err);
        }
        Product.findById(productId, (err, product) => {
          if(err) {
            return res.status(500).json(err);
          }
          return res.status(200).json(product);
        });
      });
    }
  },

  deleteProduct(req, res) {
    const productId = req.params.id;
    if(productId) {
      Product.findByIdAndRemove(productId, (err, deletedProduct) => {
        if(err) {
          return res.status(401).json(err);
        }
        return res.status(200).json(deletedProduct);
      });
    }
  },

  getProductCountByCategory(req, res) {
    Product.aggregate([
      {"$group" : {_id: "$type", count:{$sum:1} }}
    ],  (err, types) => {
      if(err) {
        return res.status(500).json(err);
      } else {
      return res.status(200).json(types);
      }
    });
  },

  getProductCategories(req, res) {
    return res.status(200).json(enumProductTypes);
  }

};
