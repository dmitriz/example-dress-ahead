/**
 * Module definition for the Default screen at startup.
 */
module.exports = angular.module('restaurant-greeter.main', ['common.clover-api'])
	.controller('MainController', require('./MainController'));