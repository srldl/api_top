'use strict';
//service

// @ngInject

var Schema1DBSearch = function($resource){
	// Get either http://apptest.data.npolar.no/service/_ids.json
     // or  http://api.npolar.no/service/?q=&format=json&fields=path
	return $resource( ' http://api.npolar.no/service/_ids.json', {}, {
    query: {method: 'GET'}
    });
};

module.exports = Schema1DBSearch;