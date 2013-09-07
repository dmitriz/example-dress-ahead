/**
 * Controller for the login popup.
 * @param $scope
 * @param dialog
 * @param customersService
 * @param ordersService
 * @constructor
 */
var LoginController = function($scope, dialog, customersService, ordersService) {

    /**
     * Handle the LOGIN BUTTON CLick
     */
    $scope.loginBtnHandler = function()
    {
        // Load the selected customer
        customersService.getCustomer($scope.loginData.customer, getCustomerCallback);
    };


    /**
     * Callback for get customer service call.
     * @param data
     */
    var getCustomerCallback = function(data)
    {
        // save to root scope so it's available everywhere
        $scope.$root.customer = data.customer;

        // get or create current order for customer
        var order = ordersService.getOrCreateOrderForCustomer($scope.$root.customer).then(getOrderCallback);
    };


    /**
     * Callback for current order
     * @param data
     */
    var getOrderCallback = function(data)
    {
        $scope.$root.order = data.order;

        this.dialog.close();
    };


    /**
     * Default error handler
     * @param data
     */
    var errorCallback = function(data)
    {
        $window.alert(status +":" +data.message);
    };




    /**
     * Invoked on startup, like a constructor.
     */
    var init = function()
    {
        this.dialog = dialog;
        // init form model
        $scope.loginData = {};

        // start by pulling customers list, for the login drop down.
        customersService.getCustomers().success(function(data){
            $scope.customerList = data.customers;
        });
    };
    init();
};

LoginController.$inject = ['$scope', 'dialog', 'customersService', 'ordersService'];
module.exports = LoginController;