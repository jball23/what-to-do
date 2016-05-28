"use strict";

(function(){
  angular
    .module("whatTodo", [
      "ui.router",
      "ngResource"
    ])
    .config(Router)
    .factory("Todo", todoFactoryFunc)
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

    todoIndexCtrl.$inject = ["Todo"];
    function todoIndexCtrl(Todo){
      var vm = this;
      vm.todos = Todo.query();
      vm.create = function(){
        Todo.save(vm.newTodo, function(response){
          vm.todos.push(response);
        })
      }
    }

    todoShowCtrl.$inject = ["$stateParams"]
    function todoShowCtrl($stateParams){
      var vm = this;
      vm.todo = $stateParams;
    }

})();
