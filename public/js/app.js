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
      var Todo = $resource("/api/todos/:title", {}, {
        update: {method: "PATCH"}
      });
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

    todoShowCtrl.$inject = ["$stateParams", "Todo", "$state"]
    function todoShowCtrl($stateParams, Todo, $state){
      var vm = this;
      vm.todo = Todo.get($stateParams);
      vm.delete = function(){
        Todo.remove($stateParams, function(){
          $state.go("todoIndex");
        });
      }
      vm.update = function(){
        Todo.update($stateParams, vm.todo, function(response){
          $state.go("todoShow", response);
        });
      }

      var map;
      vm.initMap = function(){

          var mapOptions = {
            zoom: 8,
            center: {lat: 38.889931, lng: -77.009003}
          };
          map = new google.maps.Map(document.getElementById('map'), mapOptions);
      };  
    };

})();
