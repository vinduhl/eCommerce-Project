app.controller("MainCtrl", function($scope, productService) {

  $scope.testing = "This is a test";
  $scope.products = [];

  $scope.getProducts = function(productSearch) {

    $scope.errorMessage = "";

    productService.getProducts(productSearch)
      .then( function(result) {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.products = result.data;
          console.log("result.data");
          console.log(result.data);
        }
      });
  };


});
