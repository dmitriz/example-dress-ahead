/**
 * Controller for the primary screen.
 * @param $scope
 * @param $window
 * @param $route
 * @param cloverConfig
 * @param $dialog
 * @constructor
 */
var MainController = function($scope, $window, $route, cloverConfig, $dialog) {


    /**
     * Invoked on startup, like a constructor.
     */
	var init = function()
    {
        if(!$dialog.isOpen )
        {
            // open login dialog
            $dialog.dialog({keyboard:false, backdropClick:false }).open('clothing-customer/login/login.tpl.html', 'LoginController');
        }
    };
    init();
};

MainController.$inject = ['$scope', '$window', '$route', 'cloverConfig', '$dialog'];
module.exports = MainController;