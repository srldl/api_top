'use strict';
//service

// @ngInject

var SchemaDBSearch = function($resource){
	//return $resource( 'https://apptest.data.npolar.no/sighting/?:search&format=json&locales=utf-8' , { search:'@search'}, {
	return $resource( 'https://raw.githubusercontent.com/npolar/api.npolar.no/master/schema/:schema2.json', { schema2:'@schema2'}, {
    query: {method: 'GET'}
    });
};

module.exports = SchemaDBSearch;