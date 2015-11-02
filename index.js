'use strict';

var angular = require('angular');

var api_top = angular.module('api_top',[]);


api_top.controller('ApiCtrl', function($scope) {
      $scope.schema = "test";
     console.log("test");
});
