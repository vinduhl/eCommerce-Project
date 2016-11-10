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


});
