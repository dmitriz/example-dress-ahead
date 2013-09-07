/**
 * Controller for the default HOME screen that shows all of the categories and products.
 * @param $scope
 * @param productModel
 * @param $timeout
 * @constructor
 */
var HomeController = function($scope, productModel, $timeout) {

	var scrollVelocity = 2;

    /**
     * Invoked on startup, like a constructor.
     */
	var init = function()
    {
        // start by fetching products & categories
        productModel.getProductsCategories().then(function(data){
            $scope.categories = data;
        });
    };
    init();


    /**
     * Start Scroll event handler
     * @param category
     * @param direction
     */
	$scope.startScroll = function(category, direction) {
		if (!category.scrollLeft) {
			category.scrollLeft = 0;
		}

		$scope.currentScrollCategory = category;
		category.scrollDirection = direction;

		scroll();
	};


    /**
     * Stop Scroll event handler
     * @param category
     */
	$scope.stopScroll = function(category) {
		$scope.currentScrollCategory = null;
	};


    /**
     * Define scroller
     */
	var scroll = function() {
		if ($scope.currentScrollCategory) {
			$scope.currentScrollCategory.scrollLeft += $scope.currentScrollCategory.scrollDirection * scrollVelocity;
			$timeout(scroll, 1);
		}
	};
};

HomeController.$inject = ['$scope', 'productModel', '$timeout'];
module.exports = HomeController;