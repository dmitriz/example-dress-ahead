var HomeController = function($scope, $log, inventoryService) {
	$log.info('home');

	inventoryService.getItems()
		.success(function(items) {
			$scope.items = items;
			$log.info(items);
		}).error(function(error) {
			$log.info('error');
			$log.info(error);
		});
};

HomeController.$inject = ['$scope', '$log', 'inventoryService'];
module.exports = HomeController;