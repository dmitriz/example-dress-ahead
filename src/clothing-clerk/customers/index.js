/**
 * Module definition for the Customers screen that shows all orders ready for try on.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-clerk.customers', ['common.clover-api'])
	.controller('CustomersController', require('./CustomersController'))
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {templateUrl: "clothing-clerk/customers/customers.tpl.html", controller: "CustomersController"});
	}]);