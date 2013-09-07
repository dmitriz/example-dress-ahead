/**
 * Proxy class for the different Inventory related Clover APIs
 * @param cloverConfig
 * @param $http
 * @constructor
 */
var InventoryService = function(cloverConfig, $http) {

    /**
     * Get all Inventory items
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.getItems = function(successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/items?access_token=' +
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
     * Get all Items with the Category data, allowing us to group product by category.
     * @param successCallback (optional)
     * @param errorCallback  (optional)
     */
	this.getItemsWithCategories = function(successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/items_with_categories?access_token=' +
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
     * Add a new ITEM to the Clover system.
     * @param item
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.addItem = function(item, successCallback, errorCallback) {

        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/items?access_token=' +
			cloverConfig.accessToken,
			item,
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
     * Get a single ITEM, by ID.
     * @param itemID
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.getItem = function(itemID, successCallback, errorCallback) {
        var get = $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/items/' +
			itemID +
			'?access_token=' +
			cloverConfig.accessToken,
			{ cache: false });

        if( successCallback !== undefined ){
            get.success(function(data, status, headers, config){
                successCallback(data.item, status, headers, config);
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
     * Update the ITEM in the clover system
     * @param item
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.updateItem = function(item, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/items/' +
			itemID +
			'?access_token=' +
			cloverConfig.accessToken,
			item,
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
     * Delete an item from the Clover System
     * @param itemID
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.deleteItem = function(itemID, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/items/' +
			itemID +
			'/delete?access_token=' +
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
     * Get the different categories in the Clover System.
     * @param categoryID
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.getCategories = function(categoryID, successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/categories?access_token=' +
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
     * Get a single category
     * @param categoryID
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.getCategory = function(categoryID, successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/inventory/categories/' +
			categoryID +
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

InventoryService.$inject = ['cloverConfig', '$http' ];
module.exports = InventoryService;