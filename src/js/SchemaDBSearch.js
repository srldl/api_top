'use strict';
//service

// @ngInject

var Schema1DBSearch = function($resource, $http){
	// Get either http://apptest.data.npolar.no/service/_ids.json
     // or  http://api.npolar.no/service/?q=&format=json&fields=path
    // https://apptest.data.npolar.no:3000/service/_ids.json
	//return $resource( 'https://apptest.data.npolar.no:3000/service/_ids.json', {}, {

  var getValues = function(Inputlink) {
    console.log('making http request');
    console.log(Inputlink);
    return $http.get(Inputlink);
  };

  return {
    getValues: getValues
  }
};


module.exports = Schema1DBSearch;

