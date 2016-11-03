app.controller("MainCtrl", function($scope, productService) {

  $scope.testing = "This is a test";
  $scope.products = [];

  $scope.getProducts = function() {

    $scope.errorMessage = "";

    productService.getProducts()
      .then( function(result) {
        if(result.error) {
          $scope.errorMessage = result.error;
        } else {
          $scope.products = result.data;
        }
      });
  }

})
