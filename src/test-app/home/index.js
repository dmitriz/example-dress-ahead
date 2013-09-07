module.exports = angular.module('test-app.home', ['common.clover-api'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when("/", {templateUrl: "test-app/home/home.tpl.html", controller: "HomeController"});
	}])
	.controller('HomeController', require('./HomeController'));