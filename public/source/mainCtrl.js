app.controller("MainCtrl", ($scope, $state, productService, userService) => {

  $scope.products = [];
  $scope.users = [];
  $scope.editMode = false;
  $scope.newProductCreated = false;

  userService.getUsers().then( (result) => {
    console.log("called userService.getUsers()");
    if(result.error) {
      $scope.errorMessage = result.error;
    } else {
      $scope.users = result.data;
      $scope.userSelection = $scope.users[0];
      $scope.getCart($scope.userSelection);
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
    newProduct.name = "";
    newProduct.description = "";
    newProduct.type = "";
    newProduct.onhand = "";
    newProduct.price = "";
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

  $scope.addToCart = (product, user) => {
    console.log("Here!!!!");
    const qtyTextbox = document.getElementById(`${product._id}_qty`);
    const qty = qtyTextbox.value;
    qtyTextbox.value = "0";
    console.log("product:", product);
    console.log("user:", user);
    console.log("qty:", qty);
    if(user) {
      userService.addToCart(user, product, qty);
      $scope.getCart(user);
    }

  }

  $scope.getCart = (user) => {
    userService.getCart(user)
      .then( (result) => {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.cart = result.data;
        }
      });
  }

  $scope.cancelEdit = () => {
    $scope.editMode = false;
  }

  $scope.hideNewProductDisplay = () => {
    $scope.newProductCreated = false;
  }

});
