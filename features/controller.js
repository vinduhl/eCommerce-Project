
module.exports = {

  addProduct(req, res) {
    console.log("addProduct()");
    return res.status(200).json({ message: "addProduct()" });
  },

  getProduct(req, res) {
    console.log("getProduct()");
    return res.status(200).json({ message: "getProduct()" });
  },

  updateProduct(req, res) {
    console.log("updateProduct()");
    return res.status(200).json({ message: "updateProduct()" });
  },

  deleteProduct(req, res) {
    console.log("deleteProduct()");
    return res.status(200).json({ message: "deleteProduct()" });
  }

}
