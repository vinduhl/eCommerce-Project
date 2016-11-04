app.service("productService", function($http, $q) {

  const baseUrl = "http://localhost:8800/api/";

  function ProductResponse(err = null, data = null) {
    this.error = err;
    this.data = data;
  }

  this.getProducts = (productSearch) => {

    let queryArray = [];
    let productId = "";
    let queryString = "";

    if(productSearch) {
      if(isPresent(productSearch.productName)) {
        queryArray.push(`name=${productSearch.productName}`);
      }
      if(isPresent(productSearch.productType)) {
        queryArray.push(`type=${productSearch.productType}`);
      }
      if(isPresent(productSearch.productId)) {
        productId = `/${productSearch.productId}`;
      }
    }

    if(queryArray.length > 0) {
      queryString = `?${queryArray.join("&")}`;
    }
    console.log("Path:");
    console.log(`${baseUrl}products${productId}${queryString}`);
    return $http
      .get(`${baseUrl}products${productId}${queryString}`)
      .then( (response) => {
          return new ProductResponse(null, response.data);
      },
      (errorResponse) => {
        return new ProductResponse(errorResponse.data);
      }
    );
  };

  this.addProduct = (product) => {
    return $http
      .post(`${baseUrl}products`)
      .then( (response) => {
        return new ProductResponse(null, response.data);
      },
      (errorResponse) => {
        return new ProductResponse(errorResponse.data);
      });
  };

  function isPresent(field) {
    return field && field.trim() !== "";
  }

});
