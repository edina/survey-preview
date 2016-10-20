(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldAudio',{
			templateUrl: 'partials/fieldAudio.html',
			controller: ['$log',function($log){
				var self = this;
				this.$onInit = function(){
					$log.debug('fieldAudio.$onInit: %o',self);
				};
			}],
			bindings: {
				'obj': '<'
			}
		});
})(this.window);