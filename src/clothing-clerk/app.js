/**
 * Initial definition of the Angular Application. This class imports (requires) all of the modules for the application.
 */
require('clothing-clerk-templates');

// define default / route.
var App = function($routeProvider) {
	$routeProvider.otherwise({redirectTo: "/"});
};

App.$inject = ['$routeProvider'];

// Define the required modules
angular.module('clothing-clerk', [
	'ngCookies',
	'ngResource',
    'ui.bootstrap',
	'btford.socket-io',
	'clothing-clerk.templates',
	require('../common/clover-api').name,
	require('./main').name,
	require('./customer').name,
	require('./customers').name,
	require('./products').name,
	require('./login').name
], App);