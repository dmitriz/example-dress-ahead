/**
 * Initial definition of the Angular Application. This class imports (requires) all of the modules for the application.
 */
require('clothing-customer-templates');

// define default / route.
var App = function($routeProvider) {
	$routeProvider.otherwise({redirectTo: "/"});
};

App.$inject = ['$routeProvider'];

// Define the required modules
angular.module('clothing-customer', [
	'ngCookies',
	'ngResource',
	'btford.socket-io',
	'clothing-customer.templates',
    'ui.bootstrap',
	require('../common/clover-api').name,
	require('./cart').name,
	require('./category').name,
	require('./home').name,
	require('./main').name,
	require('./product').name,
	require('./try-in-store').name,
	require('./login').name,
	require('../common/directives').name
], App);