app.service("productService", function($http, $q) {

  const baseUrl = "http://localhost:8800/api/";

  ProductResponse = function(err = null, data = null) {
    this.error = err;
    this.data = data;
  };

  this.getProducts = function() {
    return $http
      .get(`${baseUrl}products`)
      .then( function(response) {
          return new ProductResponse(null, response.data);
      },
      function(errorResponse) {
        return new ProductResponse(errorResponse.data);
      }
    );
  };

});
