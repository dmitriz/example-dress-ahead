/**
 * Module definition for the View All Category screen.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-customer.category', ['common.clover-api'])
	.controller('CategoryController', require('./CategoryController'))
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/c/:categoryID", {templateUrl: "clothing-customer/category/category.tpl.html", controller: "CategoryController"});
}]);