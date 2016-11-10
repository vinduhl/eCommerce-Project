app.controller("MainCtrl", ($scope, $state, productService, userService) => {

  $scope.products = [];
  $scope.users = [];
  $scope.editMode = false;
  $scope.newProductCreated = false;

  userService.getUsers().then( (result) => {
    if(result.error) {
      $scope.errorMessage = result.error;
    } else {
      $scope.users = result.data;
    }
  });

  $scope.isCustomerView = () => {
    return $state.current.name === "home";
  }

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
