app.service("userService", function($http) {

  const baseUrl = "http://localhost:8800/api/";


  this.getUsers = () => {
    return $http
      .get(`${baseUrl}user`)
      .then( (response) => {
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

  this.addToCart = (user, product, qty) => {
    let item = {
      product: product._id,
      qty: qty
    };
    return $http
      .post(`${baseUrl}cart/${user._id}`, item )
      .then( (response) => {
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

  this.getCart = (user) => {
    return $http
      .get(`${baseUrl}cart/${user._id}`)
      .then( (response) => {
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  }

});
