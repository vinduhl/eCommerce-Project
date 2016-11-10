app.service("productService", function($http, $q) {

  const baseUrl = "http://localhost:8800/api/";


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
          return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

  this.addProduct = (product) => {
    return $http
      .post(`${baseUrl}products`, product)
      .then( (response) => {
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

  this.updateProduct = (product) => {
    return $http
      .put(`${baseUrl}products/${product._id}`, product)
      .then( (response) => {
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

  this.deleteProduct = (productId) => {
    return $http
      .delete(`${baseUrl}products/${productId}`)
      .then( (response) => {
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  }


  function isPresent(field) {
    return field && field.trim() !== "";
  }

});
