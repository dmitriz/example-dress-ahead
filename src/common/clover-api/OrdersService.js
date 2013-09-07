/**
 * Proxy class for the different ORDER related Clover APIs
 * @param cloverConfig
 * @param $http
 * @param $q
 * @param $window
 * @constructor
 */
var OrderService = function(cloverConfig, $http, $q, $window) {

    /**
     * Get all orders
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.getOrders = function(successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders?access_token=' +
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
     * Get a single order
     * @param orderId
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.getOrder = function(orderId, successCallback, errorCallback) {
		var get = $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
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


    /**
     * Create Order in Clover systems
     * @param order
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.createOrder = function(order, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders?access_token=' +
			cloverConfig.accessToken,
			order,
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
     * Update the ORDER State
     * @param orderId
     * @param state
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.updateOrderState = function(orderId, state, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/state?access_token=' +
			cloverConfig.accessToken,
			{state: state},
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
     * Update the ORDER note property.  We use this to flag the order so it is ready to try on in store and will appear in the CLERK application
     * @param orderId
     * @param note
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.updateOrderNote = function(orderId, note, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/note?access_token=' +
			cloverConfig.accessToken,
			{note: note},
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
     * Link a customer to an Order
     * @param orderId
     * @param customerId
     * @param successCallback  (optional)
     * @param errorCallback   (optional)
     */
	this.updateOrderCustomer = function(orderId, customerId, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/customer?access_token=' +
			cloverConfig.accessToken,
			{customerUuid: customerId},
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
     * Delete an Order
     * @param orderId
     * @param successCallback (optional)
     * @param errorCallback  (optional)
     */
	this.deleteOrder = function(orderId, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/delete?access_token=' +
			cloverConfig.accessToken,
			{},
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
     * Return the items attached to an Order
     * @param orderId
     * @param successCallback (optional)
     * @param errorCallback  (optional)
     */
	this.getOrderLineItems = function(orderId, successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/line_items?access_token=' +
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
     * Attach an item to an Order
     * @param orderId
     * @param itemId
     * @param successCallback (optional)
     * @param errorCallback  (optional)
     */
    //  /v2/merchant/{mId}/orders/{orderId}/line_items
    this.createOrderLineItem = function(orderId, itemId, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/line_items' +
			'?access_token=' +
			cloverConfig.accessToken,
            {item: {id:itemId}},
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
     * Delete Line Item from Order
     * @param orderId
     * @param lineItemId
     * @param successCallback (optional)
     * @param errorCallback  (optional)
     */
	this.deleteOrderLineItem = function(orderId, lineItemId, successCallback, errorCallback) {
        var get =  $http.post(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/line_items/' +
			lineItemId +
			'/delete?access_token=' +
			cloverConfig.accessToken,
			{},
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
     * Get the Order Payments
     * @param orderId
     * @param successCallback (optional)
     * @param errorCallback (optional)
     */
	this.getOrderPayments = function(orderId, successCallback, errorCallback) {
        var get =  $http.get(cloverConfig.baseURL + 'merchant/' +
			cloverConfig.merchantID +
			'/orders/' +
			orderId +
			'/payments?access_token=' +
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
     * Callback for the Create Order call, which will flip the STATE to OPEN for us.
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var createOrderCallback = function(data, status, headers, config)
    {
        var orderID = data.uuid;

        // set order state to OPEN
        this.updateOrderState(orderID, 'OPEN', updateOrderStateCallback, errorHandler);
    };

    /**
    var updateOrderStateCallback = function(data, status, headers, config)
    {
        this.updateOrderCustomer(orderID, $scope.$root.customer.id).success(function() {
            // fetch new order
            this.getOrder((orderID)).success(function(data) {
                deferred.resolve(data);
            });
        });
    };
     **/


    /**
     * Default Error Handler
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var errorHandler = function(data, status, headers, config)
    {
        $window.alert(status +":" +data.message);
    };


    /**
     * Chain a number of commands together to create a new order or use reuse last order
     * @param customer
     * @returns {Promise.promise|*}
     */
	this.getOrCreateOrderForCustomer = function(customer) {
		var deferred = $q.defer();
        var instance = this;
        //todo: loop over "customer.orders" and only count the "OPEN" orders

		if (customer.orders.length) {
			// use last order
			var orderID = customer.orders[customer.orders.length-1].uuid;

			// fetch exist order
			this.getOrder((orderID)).success(function(data) {
				deferred.resolve(data);
			});
		} else {
			// create new order if customer doesn't have one
			this.createOrder({}).success(function(data) {
				var orderID = data.uuid;

				// set order state to OPEN
                instance.updateOrderState(orderID, 'OPEN').success(function() {

					// save customer to order
                    instance.updateOrderCustomer(orderID, customer.id).success(function() {
						// fetch new order
                        instance.getOrder((orderID)).success(function(data) {
							deferred.resolve(data);
						});
					});
				});
			});
		}

		return deferred.promise;
	};


    /**
     * Build a LINE Item Object to use when attaching an item to an Order
     * @param item
     * @returns {{itemId: (*|id|$scope.employeeList.id|test.id|locals.id|module.id|createHAR.log.id|result.id|file.id|Browser.serialize.id|clients.id|top.id|current.id|rec.id|customers.MAT91RW0NM4FM.id|customers.Q3Q80K6PD9SAG.id|customers.id|customers.NPJZ2JDDXQC2J.id|customers.AWEH41CXZPTXA.id|customers.VPRPNZCJH9N7P.id|customers.HKKN56GRK4RJT.id|customers.JY77QHE1AAHG4.id|customers.RH74KAG2ACEY6.id|customers.VQXFK6DHP6YHW.id|customers.BYKNN9HRZZFQJ.id|customers.SENRW9V0SMAFJ.id|questions.id|.topic.id|aa.id|X.id|YAHOO.widget.TreeView.id|i._newInst.id|string|f.id|m.id|QUnit.id|jsDump.DOMAttrs.id|jasmine.Env.xit.id|summary.id|Datepicker._newInst.id|$c.$get.id|newContext.makeModuleMap.id|.module.id|newContext.getScriptData.id|String|Null|parsePropertyFunction.id|parseVariableDeclaration.id|parseFunctionDeclaration.id|parseFunctionExpression.id|Selector.xpath.id|Selector.criteria.id|Function|document.id|Swiff.options.id|res.id|.parsePropertyFunction.id|.parseVariableDeclaration.id|.parseFunctionDeclaration.id|.parseFunctionExpression.id|stats.id|$LocaleProvider.$get.id|data.expression.right.value.id|data.id|data.consequent.expression.id|data.consequent.id|data.init.id|data.left.id|data.left.init.id|data.expression.id|data.body.id|data.expression.callee.id|testFixture.expression.right.value.id|testFixture.id|testFixture.consequent.expression.id|testFixture.consequent.id|testFixture.init.id|testFixture.left.id|testFixture.left.init.id|testFixture.expression.id|testFixture.body.id|testFixture.expression.callee.id|testFixture.init.value.id|exports.model.id|tryCharge.id|trip.id|client.id|user.id|model.id|require.$LocaleProvider.$get.id|require.$c.$get.id|require._newInst.id|Store.Client.id|Client.id|.uniqueId.id|packet.id|BaseBrowser.id|Browser.id|Socket.id|Y.id|Transport.id|LocalizedString.id|.Timer.id|Timer.id|Backbone.Model.id|Test.id|jasmine.Spec.id|jasmine.Suite.id|v.id|Benchmark.id|CodeMirror.Delayed.id|Delayed.id|root.id|Swiff.id|Ext.Element.id|.appendChild.id|attributes.id), productCode: (number|event.code|*|Number|exports.minify.code|code|result.code|products.code|products.UM01001.code|products.UM01002.code|products.UM01003.code|products.UM01004.code|products.UM01005.code|products.UM01006.code|products.UM02001.code|products.UM02002.code|products.UM02003.code|products.UM02004.code|products.UM02005.code|products.UM02006.code|products.UM03001.code|products.UM03002.code|products.UM03003.code|products.UM03004.code|products.UM03005.code|products.UM03006.code|products.UM04001.code|products.UM04002.code|products.UM04003.code|products.UM04004.code|products.UM04005.code|products.UM04006.code|products.UM05001.code|products.UM05002.code|products.UM05003.code|products.UM05004.code|products.UM05005.code|products.UM05006.code|generated.code|SourceNode.toStringWithSourceMap.code|obj.code|string|JSHINT.quit.code|exports.code|key.code|CloseEvent.code|Lexer.code|.CodeFragment.code|DOMEvent.code), taxRate: Function, name: (item.name|*), exchanged: boolean, price: *, adjustments: Array, modifications: Array, note: string, itemCode: (number|event.code|*|Number|exports.minify.code|code|result.code|products.code|products.UM01001.code|products.UM01002.code|products.UM01003.code|products.UM01004.code|products.UM01005.code|products.UM01006.code|products.UM02001.code|products.UM02002.code|products.UM02003.code|products.UM02004.code|products.UM02005.code|products.UM02006.code|products.UM03001.code|products.UM03002.code|products.UM03003.code|products.UM03004.code|products.UM03005.code|products.UM03006.code|products.UM04001.code|products.UM04002.code|products.UM04003.code|products.UM04004.code|products.UM04005.code|products.UM04006.code|products.UM05001.code|products.UM05002.code|products.UM05003.code|products.UM05004.code|products.UM05005.code|products.UM05006.code|generated.code|SourceNode.toStringWithSourceMap.code|obj.code|string|JSHINT.quit.code|exports.code|key.code|CloseEvent.code|Lexer.code|.CodeFragment.code|DOMEvent.code), taxRates: *, id: (*|id|$scope.employeeList.id|test.id|locals.id|module.id|createHAR.log.id|result.id|file.id|Browser.serialize.id|clients.id|top.id|current.id|rec.id|customers.MAT91RW0NM4FM.id|customers.Q3Q80K6PD9SAG.id|customers.id|customers.NPJZ2JDDXQC2J.id|customers.AWEH41CXZPTXA.id|customers.VPRPNZCJH9N7P.id|customers.HKKN56GRK4RJT.id|customers.JY77QHE1AAHG4.id|customers.RH74KAG2ACEY6.id|customers.VQXFK6DHP6YHW.id|customers.BYKNN9HRZZFQJ.id|customers.SENRW9V0SMAFJ.id|questions.id|.topic.id|aa.id|X.id|YAHOO.widget.TreeView.id|i._newInst.id|string|f.id|m.id|QUnit.id|jsDump.DOMAttrs.id|jasmine.Env.xit.id|summary.id|Datepicker._newInst.id|$c.$get.id|newContext.makeModuleMap.id|.module.id|newContext.getScriptData.id|String|Null|parsePropertyFunction.id|parseVariableDeclaration.id|parseFunctionDeclaration.id|parseFunctionExpression.id|Selector.xpath.id|Selector.criteria.id|Function|document.id|Swiff.options.id|res.id|.parsePropertyFunction.id|.parseVariableDeclaration.id|.parseFunctionDeclaration.id|.parseFunctionExpression.id|stats.id|$LocaleProvider.$get.id|data.expression.right.value.id|data.id|data.consequent.expression.id|data.consequent.id|data.init.id|data.left.id|data.left.init.id|data.expression.id|data.body.id|data.expression.callee.id|testFixture.expression.right.value.id|testFixture.id|testFixture.consequent.expression.id|testFixture.consequent.id|testFixture.init.id|testFixture.left.id|testFixture.left.init.id|testFixture.expression.id|testFixture.body.id|testFixture.expression.callee.id|testFixture.init.value.id|exports.model.id|tryCharge.id|trip.id|client.id|user.id|model.id|require.$LocaleProvider.$get.id|require.$c.$get.id|require._newInst.id|Store.Client.id|Client.id|.uniqueId.id|packet.id|BaseBrowser.id|Browser.id|Socket.id|Y.id|Transport.id|LocalizedString.id|.Timer.id|Timer.id|Backbone.Model.id|Test.id|jasmine.Spec.id|jasmine.Suite.id|v.id|Benchmark.id|CodeMirror.Delayed.id|Delayed.id|root.id|Swiff.id|Ext.Element.id|.appendChild.id|attributes.id), unitQty: number}}
     */
    /**
	this.buildLineItemFromItem = function(item) {
		var lineItem = {
			"itemId": item.id,
			"productCode": item.code,
			"taxRate": item.taxRates.length ? item.taxRates[0].rate : 0,
			"name": item.name,
			//"unitName": "Bottle",
			"exchanged": false,
			"price": item.price,
			"adjustments": [],
			"modifications": [],
			//"refundId": 1,
			"note": "",
			"itemCode": item.code,
			"taxRates": item.taxRates,
			//"alternateName": "LemonJuiceWater",
			"id": item.id,
			"unitQty": 1
		};

		return lineItem;
	};
     **/


    /**
     * Calculate the total properties for an order.
     * @param order
     */
	this.calculateSummaryForOrder = function(order) {
		order.subTotal = order.tax = 0;


		angular.forEach(order.lineItems, function(lineItem) {

            // special check for change in API
            if( lineItem.qty === undefined && lineItem.unitQty !== undefined )
            {
                lineItem.qty = lineItem.unitQty;
            }

			order.subTotal += lineItem.price * lineItem.qty;
			order.tax += lineItem.price * lineItem.qty * 0.06;
		});

		order.total = order.subTotal + order.tax;
	};
};

OrderService.$inject = ['cloverConfig', '$http', '$q', '$window'];
module.exports = OrderService;