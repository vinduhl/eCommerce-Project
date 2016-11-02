const Product = require("./Product");

module.exports = {

  addProduct(req, res) {
    new Product(req.body).save((err, product) => {
      if(err) {
        return res.status(500).json({ message: err });
      }
      return res.status(201).json(product);
    });

  },

  getProduct(req, res) {
    const productId = req.params.id;
    if(productId) {
      Product.findById(productId, (err, product) => {
        if(err) {
          return res.status(500).json({ message: err });
        }
        return res.status(200).json(product);
      });
    } else {
      Product.find(req.query, (err, products) => {
        if(err) {
          return res.status(500).json({ message: err });
        }
        return res.status(200).json(products);
      })
    }
  },

  updateProduct(req, res) {
    const productId = req.params.id;
    if(productId) {
      Product.findByIdAndUpdate(productId, req.body, (err, product) => {
        if(err) {
          return res.status(500).json({ message: err });
        }
        Product.findById(productId, (err, product) => {
          if(err) {
            return res.status(500).json({ message: err });
          }
          return res.status(200).json(product);
        })
      })
    }
  },

  deleteProduct(req, res) {
    const productId = req.params.id;
    if(productId) {
      Product.findByIdAndRemove(productId, (err, deletedProduct) => {
        if(err) {
          return res.status(401).json({ message: err });
        }
        return res.status(200).json(deletedProduct);
      })
    }
  }

}
