
module.exports = {

  addProduct(req, res) {
    console.log("addProduct()");
    return res.status(200).json({ message: "addProduct()" });
  },

  getProduct(req, res) {
    console.log("getProduct()");
    const productId = req.params.id;
    if(productId) {
      console.log(`productId: ${productId}`);
    }
    return res.status(200).json({ message: "getProduct()" });
  },

  updateProduct(req, res) {
    console.log("updateProduct()");
    const productId = req.params.id;
    if(productId) {
      console.log(`productId: ${productId}`);
    }
    return res.status(200).json({ message: "updateProduct()" });
  },

  deleteProduct(req, res) {
    console.log("deleteProduct()");
    const productId = req.params.id;
    if(productId) {
      console.log(`productId: ${productId}`);
    }
    return res.status(200).json({ message: "deleteProduct()" });
  }

}
