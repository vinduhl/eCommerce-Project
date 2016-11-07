app.controller("MainCtrl", ($scope, productService) => {

  $scope.testing = "This is a test";
  $scope.products = [];
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
        }
      });
  };

  $scope.getProducts();

  $scope.createProduct = (newProduct) => {

    //$scope.newProduct = null;
    $scope.newProductCreated = false;

    productService.addProduct(newProduct)
      .then( (result) => {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.newProductName = result.data.name;
          $scope.newProductCreated = true;
        }
      });
  };

  $scope.createProductAndShowList = (newProduct) => {
    const np = angular.copy(newProduct);
    $scope.createProduct(np);
    $scope.newProductForm.$setPristine();
    $scope.newProduct = {};
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

  $scope.deleteProduct = (product) => {
    if(confirm(`Are you sure you want to delete "${product.name}"?`)) {
      productService.deleteProduct(product._id);
      $scope.getProducts();
    }
  }

  $scope.cancelEdit = () => {
    $scope.editMode = false;
  }

  $scope.hideNewProductDisplay = () => {
    $scope.newProductCreated = false;
  }

});
