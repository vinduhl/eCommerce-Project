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

  this.createTempUser = () => {
    const tempUserId = `u${new Date().getTime()}`;

    let user = {
      firstname: "temp",
      lastname: tempUserId,
      email_address: `${tempUserId}@mailinator.com`
    };
    return $http
      .post(`${baseUrl}user`, user)
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
        addTotalItemPrice(response.data);
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
        addTotalItemPrice(response.data);
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

  this.updateCart = (user, product) => {
    let updateProduct = {
      cartId: product._id,
      qty: product.qty
    };
    return $http
      .put(`${baseUrl}cart/${user._id}`, updateProduct)
      .then( (response) => {
        addTotalItemPrice(response.data);
        return new APIResponse(null, response.data);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  }

  function addTotalItemPrice(cart) {
    if(cart && Array.isArray(cart)) {
      cart.forEach( (item) => {
        item.totalPrice = item.product.price * item.qty;
      });
    }
  }

});
