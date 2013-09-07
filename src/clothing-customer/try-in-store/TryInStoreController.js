/**
 * Controller for the TRY ON IN STORE instructions
 * @param $scope
 * @param $window
 * @param socket
 * @constructor
 */
var TryInStoreController = function($scope, $window, socket) {

    /**
     * Send WebSocket message to the CLERK application.
     */
    $scope.ready = function() {
		//socket.emit('tryInStoreRequest', {customer: $scope.$root.customer, order: $scope.$root.order});
	};


    /**
     * Initialize the LEAFLET map, with a fake Michigan Ave, IL location.
     */
    var initMap = function(){
        var map = L.map('map', {
            center: [41.8988153, -87.62297860000001],
            zoom: 13,
            scrollWheelZoom: false
        });

        /* add layers */

        L.tileLayer('http://{s}.tile.cloudmade.com/f98a33d731464da2b799c320be037ada/3/256/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>'
        }).addTo(map);

    };

    $scope.$on('$viewContentLoaded', initMap);

};

TryInStoreController.$injct = ['$scope', '$window', 'socket'];
module.exports = TryInStoreController;