app.controller("MainCtrl", ($scope, productService) => {

  $scope.testing = "This is a test";
  $scope.products = [];
  $scope.newProduct = {};
  $scope.editMode = false;
  $scope.newProductCreated = false;

  $scope.getProducts = (productSearch) => {

    $scope.errorMessage = "";

    productService.getProducts(productSearch)
      .then( (result) => {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.products = result.data;
          console.log("result.data");
          console.log(result.data);
        }
      });
  };

  $scope.getProducts();

  $scope.createProduct = (newProduct) => {

    $scope.newProduct = null;
    $scope.newProductCreated = false;

    productService.addProduct(newProduct)
      .then( (result) => {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.newProduct = result.data;
          $scope.newProductCreated = true;
        }
      });
  };

  $scope.createProductAndShowList = (newProduct) => {
    $scope.createProduct(newProduct);
    $scope.newProduct = {
      name: "",
      description: "",
      type: "",
      onhand: "",
      price: ""
    };
    
    $scope.getProducts();
  };

  $scope.editProduct = (product) => {
    $scope.productToEdit = product;
    $scope.editMode = true;
  };

  $scope.updateProduct = (product) => {
    productService.updateProduct(product);
    $scope.getProducts();
    $scope.editMode = false;
  }

  $scope.cancelEdit = () => {
    $scope.editMode = false;
  }

  $scope.hideNewProductDisplay = () => {
    $scope.newProductCreated = false;
  }

});
