/**
 * Module definition for the Product Details screen.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-customer.product', ['common.clover-api'])
	.controller('ProductController', require('./ProductController'))
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/p/:productID", {templateUrl: "clothing-customer/product/product.tpl.html", controller: "ProductController"});
}]);