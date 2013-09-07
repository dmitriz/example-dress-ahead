/**
 * Controller for the Default screen
 * @param $scope
 * @param $route
 * @param $location
 * @param $dialog
 * @param socket
 * @constructor
 */
var MainController = function($scope, $route, $location, $dialog, socket, productModel) {

    // redirect
    $scope.openOrders = function()
    {
        $location.url("/");
    };


    // On start, open the login dialog
    if(!$dialog.isOpen )
    {
        $dialog.dialog({keyboard:false, backdropClick:false }).open('clothing-clerk/login/login.tpl.html', 'LoginController');
    }

    /**
     * Invoked on startup, like a constructor.
     */
    var init = function()
    {
        // start by fetching products & categories for the cache
        productModel.getProductsCategories().then(function(data){
            $scope.categories = data;
        });
    };
    init();
};

MainController.$inject = ['$scope', '$route', '$location', '$dialog', 'socket', 'productModel'];
module.exports = MainController;