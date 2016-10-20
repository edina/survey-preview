(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldImage',{
			templateUrl: 'partials/fieldImage.html',
			controller: ['$log',function($log){
				var self = this;
				this.$onInit = function(){
					$log.debug('fieldImage.$onInit: %o',self);
				};
			}],
			bindings: {
				'obj': '<'
			}
		});
})(this.window);