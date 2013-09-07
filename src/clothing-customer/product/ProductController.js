/**
 * Controller the Product Detail screen
 * @param $scope
 * @param $window
 * @param $routeParams
 * @param $location
 * @param inventoryService
 * @param ordersService
 * @param productModel
 * @constructor
 */
var ProductController = function($scope, $window, $routeParams, $location, inventoryService, ordersService, productModel) {

    $scope.selectedImageIndx = 1;

    /**
     * Callback after loading product data.
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var productDataCallback = function(data, status, headers, config)
    {
        $scope.product = productModel.getProduct(data);
    };


    /**
     * Callback after creating new order item and linking it to the order.
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var createOrderLineItemCallback = function(data, status, headers, config)
    {
        //$scope.$root.order.lineItems.push(lineItem); //todo: bug, data returns empty object

        redirect("/cart");
    };


    /**
     * Default error handler. However we do check for a special error code 499 (Item already exists). There is no reason to show an error
     * if the user is only adding the item to the cart a second time (duplicate).
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var errorHandler = function(data, status, headers, config)
    {
        if( status === 499 )  //item already exists
        {
            redirect("/cart");
            return;
        }

        $window.alert(status +":" +data.message);
    };

    /**
     * redirect handler
     * @param url
     */
    var redirect = function(url)
    {
        $location.path( url );
    };


    /**
     * add item to existing active order
     */
	$scope.addToCart = function() {
		//var lineItem = ordersService.buildLineItemFromItem($scope.product);

		ordersService.createOrderLineItem($scope.$root.order.id, $scope.product.id, createOrderLineItemCallback, errorHandler);
	};


	$scope.addToFavorites = function() {
        //todo "Not implemented yet!";
	};


    /**
     * Invoked on startup, like a constructor.
     */
    var init = function()
    {
        // start by loading the selected item
        inventoryService.getItem($routeParams.productID, productDataCallback, errorHandler);
    };
    init();
};

ProductController.$inject = ['$scope', '$window', '$routeParams', '$location', 'inventoryService', 'ordersService', 'productModel'];
module.exports = ProductController;