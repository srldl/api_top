'use strict';
//service

// @ngInject

var Schema2DBSearch = function($resource){
	//return $resource( 'https://apptest.data.npolar.no/sighting/?:search&format=json&locales=utf-8' , { search:'@search'}, {
	return $resource( 'https://apptest.data.npolar.no/:schema2/?q=&fields=:vars2&limit=5000', { schema2:'@schema2', vars2:'@vars2'}, {
    query: {method: 'GET'}
    });
};

module.exports = Schema2DBSearch;