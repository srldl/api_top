'use strict';

var angular = require('angular');
require('angular-resource');

var api_top = angular.module('api_top',['ngResource']);


api_top.service('SchemaDBSearch', require('./js/SchemaDBSearch'));
api_top.service('Schema2DBSearch', require('./js/Schema2DBSearch'));



api_top.controller('ApiCtrl', function($scope, SchemaDBSearch, Schema2DBSearch) {
     //Initialize parameter array
     $scope.keys = [];
     //Initalize visualisation choice
     $scope.keysV = ['bar plot', 'pie chart'];

     //Get schemas via https://api.npolar.no/service/_ids.json
 /*      var full2 = SchemaDBSearch.get({schema2:schema2}, function(){
            //Extract keys from schema, send to select
            $scope.keys = Object.keys(full.properties);
            $scope.keys_all = Object.keys(full);
            console.log('keys', $scope.keys_all);
       });
      }; */


     //Get schema
     $scope.submit = function() {

       var schema2 = $scope.schema2;

       //Get schema from input
       var full = SchemaDBSearch.get({schema2:schema2}, function(){

       	    //Extract keys from schema, send to select
       	    $scope.keys = Object.keys(full.properties);
            $scope.keys_all = Object.keys(full);
            console.log('keys', $scope.keys_all);
       });
      };


       //Choose parameters and visualisation
       $scope.submit_vars = function(){

          //Fetch scope vars -var 0 only
          var vars2 = $scope.vars;
          var varsV = $scope.varsV;
          console.log($scope);


          var vars_res = Schema2DBSearch.get({schema2:$scope.schema2, vars2:vars2}, function(){
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

              //Find maximum value, get height of bar plot (scale)
              var arrayMax = Function.prototype.apply.bind(Math.max, null);
              var maximum = arrayMax(values);
              var scale = 1000/maximum;

              var data = a;

              //Reset DOM from div tag in case you want another variable
              var node = document.getElementById("chart");
              if (node && node.hasChildNodes()) {
                  node.innerHTML = '';
              }

              console.log(data);

              //Choose type of visualisation
              switch($scope.varsV[0]) {
                case "pie chart": {
                        create_pie_chart(data, $scope.explanation);
                        break;
               } case "bar plot": {
                        create_bar_plot(data, $scope.name_y_axis, $scope.name_x_axis, $scope.explanation);
                        break;
               } default: {
                        create_bar_plot(data, $scope.name_y_axis, $scope.name_x_axis, $scope.explanation);
                      }
              }

          }); //vars_res





       }; //submit_vars


        function create_pie_chart(data, explanation) {
                var width = 960,
                height = 500,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00",
                  "#96abc5", "#8589a6", "#756888", "#63486b", "#a75d56", "#d8743c", "#f58c00"]);

            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var labelArc = d3.svg.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.population; });

            var svg = d3.select(".chart").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            d3.json("data.json", function(error, data) {
              if (error) throw error;

              var g = svg.selectAll(".arc")
                  .data(pie(data))
                .enter().append("g")
                  .attr("class", "arc");

              g.append("path")
                  .attr("d", arc)
                  .style("fill", function(d) { return color(d.data.age); });

              g.append("text")
                  .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                  .attr("dy", ".35em")
                  .text(function(d) { return d.data.age; });
            });

            function type(d) {
              d.population = +d.population;
              return d;
            }

        };

        //Create bar plot
       function create_bar_plot(data, y_axis_text, x_axis_text, explanation) {

             var margin = {top: 20, right: 20, bottom: 30, left: 40},
                  width = 960 - margin.left - margin.right,
                  height = 500 - margin.top - margin.bottom;

              var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width], .1);

              var y = d3.scale.linear()
                  .range([height, 0]);

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .ticks(10, "%");

              var svg = d3.select(".chart").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


              d3.json('data.json', function(error, data) {
                if (error) throw error;
              // svg.data(data2);


                x.domain(data.map(function(d) { console.log(d); return d.age; }));
                y.domain([0, d3.max(data, function(d) { return d.population; })]);


                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                  .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(y_axis_text);

                svg.selectAll(".bar")
                    .data(data)
                  .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.age); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.population); })
                    .attr("height", function(d) { return height - y(d.population); });
              });

              function type(d) {
                d.population = +d.population;
                return d;
              }

       };


   // };
});
