"use strict";

(function(){
  angular
    .module("whatTodo", [
      "ui.router",
      "ngResource"
    ])
    .config(Router)
    .factory("TodoFactory", todoFactoryFunc)
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

    todoFactoryFunc.$inject = ["$resource"]
    function todoFactoryFunc($resource){
      var Todo = $resource("/api/todos");
      return Todo;
    }

    todoIndexCtrl.$inject = ["TodoFactory"];
    function todoIndexCtrl(TodoFactory){
      var vm = this;
      vm.todos = TodoFactory.query();
    }

    todoShowCtrl.$inject = ["$stateParams"]
    function todoShowCtrl($stateParams){
      var vm = this;
      vm.todo = $stateParams;
    }

})();
