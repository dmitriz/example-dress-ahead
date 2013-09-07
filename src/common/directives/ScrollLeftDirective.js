/**
 * Simple directive to help the slider on the home page.
 * @returns {{link: Function}}
 * @constructor
 */
var ScrollLeftDirective = function() {
	return {
		link:function(scope, element, attrs) {
			scope.$watch(attrs.scrollLeft, function() {
				element.scrollLeft(scope.$eval(attrs.scrollLeft));
			});
		}
	};
};

module.exports = ScrollLeftDirective;