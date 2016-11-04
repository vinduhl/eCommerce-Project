app.service("productService", function($http, $q) {

  const baseUrl = "http://localhost:8800/api/";

  ProductResponse = function(err = null, data = null) {
    this.error = err;
    this.data = data;
  };

  this.getProducts = function(productSearch) {

    let queryArray = [];
    let productId = "";
    let queryString = "";

    if(isPresent(productSearch.productName)) {
      queryArray.push(`name=${productSearch.productName}`);
    }
    if(isPresent(productSearch.productType)) {
      queryArray.push(`type=${productSearch.productType}`);
    }
    if(isPresent(productSearch.productId)) {
      productId = `/${productSearch.productId}`;
    }

    if(queryArray.length > 0) {
      queryString = `?${queryArray.join("&")}`;
    }
    console.log("Path:");
    console.log(`${baseUrl}products${productId}${queryString}`);
    return $http
      .get(`${baseUrl}products${productId}${queryString}`)
      .then( function(response) {
          return new ProductResponse(null, response.data);
      },
      function(errorResponse) {
        return new ProductResponse(errorResponse.data);
      }
    );
  };


  function isPresent(field) {
    return field && field.trim() !== "";
  }

});
