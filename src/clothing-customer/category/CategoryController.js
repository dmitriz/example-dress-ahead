/**
 * Controller for the View All Category screen
 * @param $scope
 * @param $routeParams
 * @param productModel
 * @constructor
 */
var CategoryController = function($scope, $routeParams, productModel) {

    /**
     * Invoked on startup, like a constructor.
     */
    var init = function()
    {
        // fetch current category
        productModel.getCategory($routeParams.categoryID).then(function(data){
            $scope.category = data;
        });
    };
    init();

};

CategoryController.$inject = ['$scope', '$routeParams', 'productModel'];
module.exports = CategoryController;