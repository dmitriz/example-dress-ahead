/**
 * Controller for the login modal popup
 * @param $scope
 * @param dialog
 * @param $window
 * @constructor
 */
var LoginController = function($scope, dialog, $window) {

    /**
     * Set the "logged" in employee to the employee that was selected from the drop down.
     * In a real application, this would make a call to an external service to validate the login.
     */
    $scope.loginBtnHandler = function()
    {
        //customersService.getCustomer($scope.loginData.customer, getCustomerCallback);
        for(var indx in $scope.employeeList)
        {
            var emp = $scope.employeeList[indx];
            if( emp.id == $scope.loginData.employee )
            {
                $scope.$root.employee = emp;
                dialog.close();
            }
        }

    };



    /**
     * default error callback
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

        // MOCK data until the API can return employee information.
        $scope.employeeList = [
            {id: 814440, firstName: "Ryan", lastName: "Campbell"},
            {id: 516200, firstName: "Mike", lastName: "Nimer"},
            {id: 138749, firstName: "TJ", lastName: "Downes"},
        ];
    };
    init();
};

LoginController.$inject = ['$scope', 'dialog', '$window'];
module.exports = LoginController;