require('test-app-templates');

var App = function($routeProvider) {
	$routeProvider.otherwise({redirectTo: "/"});
};

App.$inject = ['$routeProvider'];

angular.module('test-app', [
	'ngResource',
	'ngCookies',
	'test-app.templates',
	require('../common/clover-api').name,
	require('./main').name,
	require('./home').name
], App);