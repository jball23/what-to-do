"use strict";

(function(){
  angular
    .module("whatToDo", [
      "ui.router"
    ])
    .config(Router);

    Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
    function Router($stateProvider, $locationProvider, $urlRouterProvider){
      $locationProvider.html5Mode(true);
      $stateProvider
      .state("main", {
        url: "/",
        template: "<h1>This Is Working</h1>"
      })
      .state("test", {
        url: "/test",
        template: "<h2>This is the test</h2>"
      });
      $urlRouterProvider.otherwise("/");
    }

})();
