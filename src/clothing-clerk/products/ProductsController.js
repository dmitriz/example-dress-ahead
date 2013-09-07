/**
 * Controller for the Add Products screen.
 * @param $scope
 * @param $routeParams
 * @param $location
 * @param productModel
 * @param inventoryService
 * @param customersService
 * @param ordersService
 * @constructor
 */
var ProductsController = function($scope, $routeParams, $location, productModel, inventoryService, customersService, ordersService) {

	// fetch Products with the Category data
    productModel.getProductsCategories().then(function(data){
        $scope.categories = data;
    });


	// fetch selected customer
	customersService.getCustomer($routeParams.customerID).success(function(data) {
		$scope.customer = data.customer;
	});

	// fetch order for selected customer
	ordersService.getOrder($routeParams.orderID).success(function(data) {
		$scope.order = data.order;

        for( var indx in data.order.lineItems )
        {
            var item = data.order.lineItems[indx];
            data.order.lineItems[indx] = productModel.getProduct(item);
        }

		ordersService.calculateSummaryForOrder(data.order);
	});

    // Add new Item to the order.
	$scope.addItemToOrder = function(item, order) {
		//var lineItem = ordersService.buildLineItemFromItem(item);
        var _item = item;
		ordersService.createOrderLineItem(order.id, item.id).success(function(data) {
			order.lineItems.push(_item);// add cached item
			ordersService.calculateSummaryForOrder(order);
		});
	};


    //redirect
    $scope.showCustomer = function(customer) {
        $location.url('/customer/'+customer.id);
    };
};

ProductsController.$inject = ['$scope', '$routeParams', '$location', 'productModel', 'inventoryService', 'customersService', 'ordersService'];
module.exports = ProductsController;