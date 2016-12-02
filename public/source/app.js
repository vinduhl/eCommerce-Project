const app = angular.module("eCommerceApp", ['ui.router']);

app.config( ($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "../views/customerView_partial.html"
  })
  .state("admin", {
    url: "/admin",
    templateUrl: "../views/adminView_partial.html",
    requireAuth: true
  })
  .state("login", {
    url: "/login",
    templateUrl: "../views/login_partial.html"
  })

  $urlRouterProvider
      .otherwise('/');
});
