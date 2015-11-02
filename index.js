'use strict';

var angular = require('angular');

var api_top = angular.module('api_top',[]);


api_top.controller('ApiCtrl', function($scope) {
    console.log("Running..");

     $scope.submit = function() {
       console.log($scope.schema);
       $scope.vars = [ {id: "var1", description: "vars1 brukes til", type: "number"},
       {id: "var2", description: "vars2 brukes til", type: "integer" }];
    };
});
