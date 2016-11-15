app.directive("productCategories", function() {
  return {
    restrict: "E",
    scope: {
      getProducts: "="
    },
    templateUrl: "./directives/productCategoriesTemplate.html",
    controller: function($scope, productService) {

      $scope.getProductCountByCategory = () => {
        productService.getProductCountByCategory()
          .then( (result) => {
            if(result.error) {
              $scope.errorMessage = result.error;
            } else {
              $scope.productCountByCategory = result.data;
            }
          });
      };
      $scope.getProductCountByCategory();
    },
    link: function(scope, elem, attrs) {

      scope.getProductsByCategory = (categoryName) => {
        if(scope.getProducts) {

          const productSearch = {
            productType: categoryName
          };
          scope.getProducts(productSearch);
        }
      }
    }
  };
});
