(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldRange',{
			templateUrl: 'partials/fieldRange.html',
			controller: ['$log',function($log){
				var self = this;
				this.response = undefined;
				this.$onInit = function(){
					$log.debug('fieldRange.$onInit: %o',self);
				};
				this.change = function(){
					this.responseChange({objResponse: {id:this.obj.id,response:parseInt(this.response)}});
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
	    "step": "1",
	    "min": "0",
	    "max": "10"
	}
*/