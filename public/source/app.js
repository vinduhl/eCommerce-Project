const app = angular.module("eCommerceApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "../views/customerView_partial.html"
  })
  .state("admin", {
    url: "/admin",
    templateUrl: "../views/adminView_partial.html"
  });

  $urlRouterProvider
      .otherwise('/');
});
