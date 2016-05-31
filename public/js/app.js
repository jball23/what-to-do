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

    todoFactoryFunc.$inject = ["$resource", "$http"]
    function todoFactoryFunc($resource, $http){
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

    todoShowCtrl.$inject = ["$stateParams", "Todo", "$state", "$http"]
    function todoShowCtrl($stateParams, Todo, $state, $http){
      var vm = this;
      vm.todo = Todo.get($stateParams)
      vm.map = Todo.get($stateParams).$promise.then(function(addy){
        var fullAddress = addy.location.address +" "+ addy.location.city +" "+ addy.location.state +" "+ addy.location.zipcode;

        geoAddress(fullAddress);
      });

      function geoAddress(fullAddress){
        var baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
        $http({
          method: 'GET',
          url: baseUrl + fullAddress + "&sensor=false"
        }).then(function(response){
          console.log(response)
          var latlng = new google.maps.LatLng(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng);
          var markerInfo = response.data.results[0].formatted_address
          console.log(latlng)
          console.log(map)
          var contentString = '<div>'+ markerInfo +'</div>';
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          console.log(marker);
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        });
      }
      var map;

      vm.initMap = function(){
        var myLatLng = {lat: 38.889931, lng: -77.009003};

        var mapOptions = {
          zoom: 10,
          center: myLatLng
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        // var marker = new google.maps.Marker({
        //   position: myLatLng,
        //   map: map,
        //   title: 'Hello World!'
        // });
      };

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
      vm.refresh = function(){
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      }
    };

})();
