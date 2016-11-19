app.directive("productCategories", function() {
  return {
    restrict: "E",
    scope: {
      getProducts: "=",
      directiveAccessor: "="
    },
    templateUrl: "./directives/categoriesDirective/productCategoriesTemplate.html",
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

      // This is to allow the external controller to call this directive's function
      // to refresh the product count by category
      if(scope.directiveAccessor) {
        scope.directiveAccessor.getProductCountByCategory = scope.getProductCountByCategory;
      }

      scope.getProductsByCategory = (categoryName) => {
        if(scope.getProducts) {

          const productSearch = {
            productType: categoryName
          };
          scope.getProducts(productSearch);
        }
      };

    }
  };
});
