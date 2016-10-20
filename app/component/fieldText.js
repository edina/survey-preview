(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldText',{
			templateUrl: 'partials/fieldText.html',
			controller: ['$log',function($log){
				var self = this;
				this.response = undefined;
				this.$onInit = function(){
					$log.debug('fieldText.$onInit: %o',self);
				};
			}],
			bindings: {
				'obj': '<',
				'responseChange': '&'
			}
		});
})(this.window);
/*	e.g of attributes that can appear for its properties
	"properties": {
    	"prefix": "record",		--TODO--
    	"placeholder": "Place default text here (if any)",
    	"max-chars": "30"
	}
*/