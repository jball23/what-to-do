"use strict";

(function(){
  angular
    .module("whatToDo", [])
    .controller("IndexCtrl", IndexCtrl)

    function IndexCtrl(){
      console.log("Hello World");
    };


})();
