/**
 * Module definition for the Customer Detail screen.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-clerk.customer', ['common.clover-api'])
	.controller('CustomerController', require('./CustomerController'))
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when("/customer/:customerID", {templateUrl: "clothing-clerk/customer/customer.tpl.html", controller: "CustomerController"});
	}]);