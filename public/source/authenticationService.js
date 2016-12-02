app.service("authenticationService", function($http) {

  const baseUrl = "http://localhost:8800/api/";

  let authenticated = false;

  this.login = (loginData) => {
    let credentials = {
      email_address: loginData.emailaddress,
      password: loginData.password
    }
    return $http
      .post(`${baseUrl}login`, credentials)
      .then( (response) => {
        authenticated = true;
        return new APIResponse(null, response.token);
      },
      (errorResponse) => {
        return new APIResponse(errorResponse.data);
      });
  };

  this.isAuthenticated = () => {
    return authenticated;
  }

});
