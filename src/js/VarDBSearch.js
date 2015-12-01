'use strict';
//service

// @ngInject

var VarDBSearch = function($resource){
	//return $resource( 'https://apptest.data.npolar.no/sighting/?:search&format=json&locales=utf-8' , { search:'@search'}, {
	return $resource( 'https:///:search', { search:'@search'}, {
    query: {method: 'GET'}
    });
};

module.exports = VarDBSearch;