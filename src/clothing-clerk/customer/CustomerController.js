/**
 * Controller for the Customer Detail screen
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param customersService
 * @param ordersService
 * @constructor
 */
var CustomerController = function($scope, $routeParams, $location, customersService, ordersService, productModel) {

    /**
     * Refresh the current order for the selected customer. If one does not exists we will create a new one.
     */
    var refreshOrder = function()
    {
        // fetch customer
        customersService.getCustomer($routeParams.customerID).success(function(data) {
            $scope.customer = data.customer;

            // fetch order
            ordersService.getOrCreateOrderForCustomer(data.customer).then(function(data) {
                $scope.order = data.order;

                for( var indx in data.order.lineItems )
                {
                    var item = data.order.lineItems[indx];
                    data.order.lineItems[indx] = productModel.getProduct(item);
                }

                ordersService.calculateSummaryForOrder(data.order);
            });
        });
    };

    /**
     * Default error callback
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var errorHandler = function (data, status, headers, config) {
        $window.alert(status + ":" + data.message);
    };

    // on start, load the order.
    refreshOrder();

	// ========================================
	// tabs
	// ========================================

	$scope.showCurrentOrder = function() {
         //todo
	};

	$scope.showOrderHistory = function() {
        //todo
	};

	$scope.showMeasurementsAndFit = function() {
        //todo
	};

	$scope.showPreferences = function() {
        //todo
	};

	// ========================================
	// order actions
	// ========================================

	$scope.addItemToOrder = function(order) {
		$location.url('/add-items/'+$scope.customer.id+'/'+$scope.order.id);
	};

	$scope.saveOrder = function(order) {
        //todo
	};

	$scope.purchaseOrder = function(order) {
        //todo
	};


    /**
     * Remove a single item from an order.
     * @param lineItemId
     */
    $scope.removeItem = function( lineItemId ) {
        var deleteId =  $scope.order.id;
        // on success we'll refresh to make sure our local copy is in sync with server
        ordersService.deleteOrderLineItem(deleteId, lineItemId, refreshOrder, errorHandler);
    };
};

CustomerController.$inject = ['$scope', '$routeParams', '$location', 'customersService', 'ordersService', 'productModel'];
module.exports = CustomerController;