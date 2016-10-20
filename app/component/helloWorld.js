(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('helloWorld',{
			template: '<h1>Hello <span ng-bind="$ctrl.name"></span></h1>',
			controller: ['$log',function($log){
				var self = this;
				this.$onInit = function(){
					$log.debug('helloWorld.$onInit: %o',self);
				};
			}],
			bindings: {
				'name': '@'
			}
		});
})(this.window);