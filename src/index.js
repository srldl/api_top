'use strict';

var angular = require('angular');
require('angular-resource');

var api_top = angular.module('api_top',['ngResource']);


api_top.service('SchemaDBSearch', require('./js/SchemaDBSearch'));
api_top.service('VarDBSearch', require('./js/VarDBSearch'));



api_top.controller('ApiCtrl', function($scope, SchemaDBSearch, VarDBSearch) {
    console.log("Running..");
    $scope.keys = [];

     $scope.submit = function() {
     //  $scope.vars = [ {id: "var1", description: "vars1 brukes til", type: "number"},
     //  {id: "var2", description: "vars2 brukes til", type: "integer" }];

       var link = $scope.schema;

       var full = SchemaDBSearch.get({search:link}, function(){

       	    //Extract keys from schema
       	    $scope.keys = Object.keys(full.properties);
       	    console.log($scope.keys);
       });

       $scope.submit_vars = function(){
          console.log("vars");
          console.log($scope);
          //$scope.vars;

          //Fetch scope vars
           var vars_res = VarDBSearch.get({search:sok}, function(){
           });

       };

    };
});
