"use strict";

(function(){
  angular
    .module("whatTodo", [
      "ui.router"
    ])
    .config(Router)
    .controller("todoIndexController", todoIndexCtrl)
    .controller("todoShowController", todoShowCtrl)

    Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
    function Router($stateProvider, $locationProvider, $urlRouterProvider){
      $locationProvider.html5Mode(true);
      $stateProvider
      .state("todoIndex", {
        url: "/todo",
        templateUrl: "/html/todo-index.html",
        controller: "todoIndexController",
        controllerAs: "tdIndexVM"
      })
      .state("todoShow", {
        url: "/todo/:title",
        templateUrl: "/html/todo-show.html",
        controller: "todoShowController",
        controllerAs: "tdShowVM"
      });
      $urlRouterProvider.otherwise("/");
    }

    function todoIndexCtrl(){
      var vm = this;
      vm.todos = [
        {title: "Todo1"},
        {title: "Todo2"},
        {title: "Todo3"},
        {title: "Todo4"}
      ];
    }

    todoShowCtrl.$inject = ["$stateParams"]
    function todoShowCtrl($stateParams){
      var vm = this;
      vm.todo = $stateParams;
    }

})();
