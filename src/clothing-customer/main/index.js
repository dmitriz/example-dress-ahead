/**
 * Module definition for the application wrapper that controls the header & main ng-view.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-customer.main', ['common.clover-api'])
	.controller('MainController', require('./MainController'))
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/login", {templateUrl: "clothing-customer/main/login.tpl.html", controller: "MainController"});
    }]);


