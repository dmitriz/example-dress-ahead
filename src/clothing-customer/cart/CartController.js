/**
 * Controller for shopping cart screen.
 * @param $scope
 * @param $window
 * @param $routeParams
 * @param $location
 * @param inventoryService
 * @param ordersService
 * @param productModel
 * @constructor
 */
var CartController = function ($scope, $window, $routeParams, $location, inventoryService, ordersService, productModel) {

    /**
     * callback for get product call
      * @param data
     * @param status
     * @param headers
     * @param config
     */
    var orderDataCallback = function (data, status, headers, config) {
        $scope.product = productModel.getProduct(data);
    };

    /**
     * callback for get order call
     * @param data
     */
    var getOrderCallback = function (data) {
        $scope.$root.order = data.order;

        // loop over and merge the lineItems with the MOCK data
        for( var indx in data.order.lineItems )
        {
            var item = data.order.lineItems[indx];
            data.order.lineItems[indx] = productModel.getProduct(item);
        }
    };

    /**
     * redirect after cancel order completes
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var cancelSuccessCallback = function(data, status, headers, config)
    {
        $location.path( "/" );
    };


    /**
     * redirect after try on in store is selected
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var tryOnSuccessCallback = function(data, status, headers, config)
    {
        $location.path( "/try-in-store" );
    };


    /**
     * default error handler
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var errorHandler = function (data, status, headers, config) {
        $window.alert(status + ":" + data.message);
    };


    /**
     * refresh the current order
     */
    var refreshOrder = function()
    {
        ordersService.getOrder($scope.$root.order.id, getOrderCallback);
    };


    /**
     * call CloverAPI to try items on in store
     */
    $scope.tryOnInStore = function() {

        ordersService.updateOrderNote($scope.$root.order.id, "HOLD-TRYON", tryOnSuccessCallback, errorHandler);
    };


    /**
     * call CloverAPI to cancel the order
     */
    $scope.cancelOrder = function()
    {
        ordersService.deleteOrder($scope.$root.order.id, cancelSuccessCallback, errorHandler);
    };


    /**
     * call Clover API to remove item from the order
     * @param lineItemId
     */
    $scope.removeItem = function( lineItemId ) {
        var deleteId =  $scope.$root.order.id;
        // on success we'll refresh to make sure our local copy is in sync with server
        ordersService.deleteOrderLineItem(deleteId, lineItemId, refreshOrder, errorHandler);
    };


    /**
     * Calculate the sub-total
     * @returns {number}
     */
    $scope.calculateSubTotal = function () {
        var total = 0;
        if( $scope.$root.order !== undefined )
        {
            for (var indx in $scope.$root.order.lineItems) {
                total += $scope.$root.order.lineItems[indx].price;
            }
        }
        return total / 100;
    };

    /**
     * TODO calculate the Shipping
     * @returns {number}
     */
    $scope.calculateShipping = function () {
        return 0;
    };


    /**
     * TODO calculate the TAX
     * @returns {number}
     */
    $scope.calculateTax = function () {
        return 0;
    };

    /**
     * TODO calculate the Total
     * @returns {number|*}
     */
    $scope.calculateTotal = function () {
        return $scope.calculateSubTotal() +$scope.calculateShipping() +$scope.calculateTax();
    };

    /**
     * Invoked on startup, like a constructor.
     */
    var init = function () {
        if ($scope.$root.order === undefined) {
            $location.path("/");
            return;
        }

        // load order
        refreshOrder();
    };
    init();
};

CartController.$inject = ['$scope', '$window', '$routeParams', '$location', 'inventoryService', 'ordersService', 'productModel'];
module.exports = CartController;

