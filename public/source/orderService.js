app.service("orderService", function($http) {

  const baseUrl = "http://localhost:8800/api/";


  this.createOrder = (user, cart) => {
    let order = {
      user: user._id,
      products: cart
    }
    return $http
      .post(`${baseUrl}order/${user._id}`, order)
      .then( (response) => {
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

});
