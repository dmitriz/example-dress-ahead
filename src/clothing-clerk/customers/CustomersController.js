/**
 * Controller for the Customers screen
 * @param $scope
 * @param $location
 * @param socket
 * @param customersService
 * @param ordersService
 * @constructor
 */
var CustomersController = function($scope, $location, socket, customersService, ordersService, productModel) {

	socket.on("tryInStoreRequest", function(data) {
		getCustomers();
	});


    /**
     * Get all customers, then check their orders for OPEN orders with the "HOLD-TRYON" note set, by the customer application.
     */
	var getCustomers = function() {
		// fetch customers
		customersService.getCustomers().success(function(data) {

			// fetch orders
			ordersService.getOrders().success(function(data)
            {
				angular.forEach(data.orders, function(order)
                {
                    // Stores all customers with a HOLD-TRYON order.
                    $scope.customers = [];
                    // Stores all customers by ID, for easy lookup.
                    $scope.customersById = {};

                    // We only care about customers with an "HOLD-TRYON" note.
					if ( order.note === "HOLD-TRYON" )
                    {
						ordersService.getOrder(order.id).success(function(data) {
                            if( data.order.lineItems.length > 0 ){
                                $scope.customers.push( order.customer );

                                $scope.customersById[order.customer.id] = order.customer;
                                $scope.customersById[order.customer.id].order = data.order;

                                // calculate the current totals & tax
                                ordersService.calculateSummaryForOrder(data.order);

                                // loop over and merge the lineItems with the MOCK data
                                for( var indx in data.order.lineItems )
                                {
                                    var item = data.order.lineItems[indx];
                                    data.order.lineItems[indx] = productModel.getProduct(item);
                                }
                            }
						});
					}
				});
			});
		});
	};


    // redirect
	$scope.showCustomer = function(customer) {
		$location.url('/customer/'+customer.id);
	};

    //redirect
	$scope.addItemToOrder = function(order) {
		$location.url('/add-items/'+order.customer.id+'/'+order.id);
	};

	$scope.purchaseOrder = function(order) {
        //todo
	};


    // Invoked on startup, like a constructor.
    var init = function()
    {
        getCustomers();

        // Refresh timer to reload the active orders at a set interval.
        //setInterval(getCustomers,10000);
    };
    init();
};

CustomersController.$inject = ['$scope', '$location', 'socket', 'customersService', 'ordersService', 'productModel'];
module.exports = CustomersController;