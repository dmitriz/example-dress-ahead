/**
 * Module definition for the Add Products screen.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-clerk.products', ['common.clover-api'])
	.controller('ProductsController', require('./ProductsController'))
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/add-items/:customerID/:orderID", {templateUrl: "clothing-clerk/products/products.tpl.html", controller: "ProductsController"});
}]);