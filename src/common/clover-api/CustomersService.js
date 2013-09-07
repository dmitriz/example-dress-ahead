/**
 * Proxy class for the different Customer related Clover APIs
 * @param cloverConfig
 * @param $http
 * @constructor
 */
var InventoryService = function(cloverConfig, $http) {

    /**
     * return all customers
     * @param successCallback (optional)
     * @param errorCallback   (optional)
     */
    this.getCustomers = function(successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/customers?access_token=' +
			cloverConfig.accessToken,
			{ cache: false });


        if( successCallback !== undefined ){
            get.success(function(data, status, headers, config){
                successCallback(data, status, headers, config);
            });
        }
        if( errorCallback !== undefined ){
            get.error(function(data, status, headers, config){
                errorCallback(data, status, headers, config);
            });
        }

        return get;
	};

    /**
     * Get a single customer
     * @param customerId
     * @param successCallback  (optional)
     * @param errorCallback  (optional)
     */
	this.getCustomer = function(customerId, successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/customers/' +
			customerId +
			'?access_token=' +
			cloverConfig.accessToken,
			{ cache: false });


        if( successCallback !== undefined ){
            get.success(function(data, status, headers, config){
                successCallback(data, status, headers, config);
            });
        }
        if( errorCallback !== undefined ){
            get.error(function(data, status, headers, config){
                errorCallback(data, status, headers, config);
            });
        }

        return get;
	};
};

InventoryService.$inject = ['cloverConfig', '$http'];
module.exports = InventoryService;