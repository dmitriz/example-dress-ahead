/**
 * Module definition for the Shopping Cart screen.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-customer.cart', ['common.clover-api'])
	.controller('CartController', require('./CartController'))
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/cart", {templateUrl: "clothing-customer/cart/cart.tpl.html", controller: "CartController"});
}]);