/**
 * Module definition for the default screen.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-customer.home', ['common.clover-api'])
	.controller('HomeController', require('./HomeController'))
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/", {templateUrl: "clothing-customer/home/home.tpl.html", controller: "HomeController"});
}]);