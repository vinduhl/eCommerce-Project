app.controller("MainCtrl", ($scope, productService) => {

  $scope.testing = "This is a test";
  $scope.products = [];
  $scope.newProduct = null;


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

    productService.addProduct(newProduct)
      .then( (result) => {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.newProduct = result.data;
        }
      });
  };

  $scope.createProductAndShowList = (newProduct) => {
    $scope.createProduct(newProduct);
    $scope.getProducts();
  };


});
