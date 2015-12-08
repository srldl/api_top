'use strict';

var angular = require('angular');
require('angular-resource');

var api_top = angular.module('api_top',['ngResource']);


api_top.service('SchemaDBSearch', require('./js/SchemaDBSearch'));
api_top.service('Schema2DBSearch', require('./js/Schema2DBSearch'));



api_top.controller('ApiCtrl', function($scope, SchemaDBSearch, Schema2DBSearch) {
     $scope.keys = [];

     $scope.submit = function() {
     //  $scope.vars = [ {id: "var1", description: "vars1 brukes til", type: "number"},
     //  {id: "var2", description: "vars2 brukes til", type: "integer" }];

       var schema2 = $scope.schema;

       //Get schema from input
       var full = SchemaDBSearch.get({schema2:schema2}, function(){

       	    //Extract keys from schema, send to select
       	    $scope.keys = Object.keys(full.properties);
       });


       //Parameter chosen
       $scope.submit_vars = function(){

          //Fetch scope vars -var 0 only
          var vars2 = $scope.vars;


          var vars_res = Schema2DBSearch.get({schema2:schema2, vars2:vars2}, function(){
              var prop = vars2[0];
              var data2 = [];

              var res = vars_res.feed.entries;


              for (var i=0; i<res.length; i++) {
                  //Push the variable onto an array
                  data2.push(res[i][prop]);
              }

              //Count values in array..accumulate values
              var u = {}, a = [];
              for(var i = 0, l = data2.length; i < l; ++i){
                    if(u.hasOwnProperty(data2[i])) {
                       u[data2[i]]++;
                       continue;
                    }
                    a.push(data2[i]);
                    u[data2[i]] = 1;
              }

              //Get values
              var values = [];
              for(var key in u) {
                  values.push(u[key]);
              }


              console.log('u', u);
              console.log('a', values);


              //Find maximum value, get height of bar plot (scale)
              var arrayMax = Function.prototype.apply.bind(Math.max, null);
              var maximum = arrayMax(values);
              var scale = 1000/maximum;

              var data = a;

              //Reset DOM from div tag in case you want another variable
              var node = document.getElementById("chart");
              console.log('node', node);
              if (node && node.hasChildNodes() ) {
                  node.innerHTML = '';
              }

          //Create a bar plot
          d3.select(".chart").selectAll("div").data(data).enter().append("div")
              .style("width", function(d) { return (u[d]*scale) + "px"; })
              .text(function(d) { return d; });

          }); //vars_res

       }; //submit_vars

    };
});
