/**
 * Module definition for the login modal popup.  This class will also define the url path that triggers this screen.
 */
module.exports = angular.module('clothing-customer.login', ['common.clover-api','ui.bootstrap'])
    .controller('LoginController', require('./LoginController'))
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/login", {templateUrl: "clothing-customer/login/login.tpl.html", controller: "LoginController"});
    }]);