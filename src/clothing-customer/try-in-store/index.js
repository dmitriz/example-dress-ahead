/**
 * Module definition for the Try On In Store instructions screen.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-customer.try-in-store', ['common.clover-api'])
	.controller('TryInStoreController', require('./TryInStoreController'))
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/try-in-store", {templateUrl: "clothing-customer/try-in-store/try-in-store.tpl.html", controller: "TryInStoreController"});
}]);

