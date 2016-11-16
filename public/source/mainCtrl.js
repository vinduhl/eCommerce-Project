app.controller("MainCtrl", function($scope, $rootScope, $state, productService, userService) {

  $scope.products = [];
  $scope.users = [];
  $scope.editMode = false;
  $scope.newProductCreated = false;
  $scope.totalCartItemQuantity = 0;
  $scope.totalCartAmount = 0;
  $scope.cart = [];

  userService.getUsers().then( (result) => {
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
  };

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


  // $scope.getProductsByCategory = (category) => {
  //   const productSearch = {
  //     productType: category
  //   }
  //   $scope.getProducts(productSearch);
  // }


  $scope.clearSearchFields = (productSearch) => {
    for(let field in productSearch) {
      if(productSearch.hasOwnProperty(field)) {
        productSearch[field] = "";
      }
    }
  }

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
    for(let field in newProduct) {
      if(newProduct.hasOwnProperty(field)) {
        newProduct[field] = "";
      }
    }
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
    $scope.getProductCountByCategory();
  };

  $scope.deleteProduct = (product) => {
    if(confirm(`Are you sure you want to delete "${product.name}"?`)) {
      productService.deleteProduct(product._id);
      $scope.getProducts();
      $scope.getProductCountByCategory();
    }
  };

  $scope.addToCart = (product, user) => {
    const qtyTextbox = document.getElementById(`${product._id}_qty`);
    const qty = qtyTextbox.value;
    qtyTextbox.value = "1";
    if(user) {
      userService.addToCart(user, product, qty);
      $scope.getCart(user);
    }

  };

  $scope.getCart = (user) => {
    userService.getCart(user)
      .then( (result) => {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.cart = result.data;
          getTotalCartQuantityAndAmount($scope.cart);
        }
      });
  };

  $scope.updateCart = (user, product) => {
    userService.updateCart(user, product)
      .then( (result) => {
        if(result.error) {
          $scope.cartUpdateMessage = result.error;
        } else {
          $scope.cart = result.data;
          getTotalCartQuantityAndAmount($scope.cart);
          $scope.cartUpdateMessage = "Your cart has been updated.";
        }
      });
  };

  $scope.cancelEdit = () => {
    $scope.editMode = false;
  };

  $scope.hideNewProductDisplay = () => {
    $scope.newProductCreated = false;
  };

  $scope.getProductCategories = () => {
    productService.getProductCategories()
      .then( (result) => {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.productCategories = result.data;
        }
      });
  };
  $scope.getProductCategories();

  $scope.setProductDisplayImage = (imageUrl, title) => {
    $scope.productImagePreview = {
      title: title,
      productImageDisplayUrl: imageUrl
    }
  }

  // $scope.getProductCountByCategory = () => {
  //   productService.getProductCountByCategory()
  //     .then( (result) => {
  //       if(result.error) {
  //         $scope.errorMessage = result.error;
  //       } else {
  //         $scope.productCountByCategory = result.data;
  //       }
  //     });
  // };
  // $scope.getProductCountByCategory();

  // $scope.runThis = () => {
  //   $rootScope.$emit("loadProductCategories", {});
  //   console.log("Testing here here here");
  // }
  // $scope.runThis();


  function getTotalCartQuantityAndAmount(cart) {
    let totalCartQty = 0;
    let totalCartAmount = 0;
    if(cart && Array.isArray(cart)) {
      cart.forEach( (item) => {
        totalCartQty += item.qty;
        totalCartAmount += item.totalPrice;
      });
    }
    $scope.totalCartItemQuantity = totalCartQty;
    $scope.totalCartAmount = totalCartAmount;
  }

});
