(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldSelect',{
			templateUrl: 'partials/fieldSelect.html',
			controller: ['$log',function($log){
				var self = this;
				this.response = undefined;
				this.$onInit = function(){
					$log.debug('fieldSelect.$onInit: %o',self);
				};
				this.change = function(){
					this.responseChange({objResponse: {id:this.obj.id,response:[this.response]}});
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
    	"options": [{
	        "value": "Alder"
	    }, {
	        "value": "Ash"
	    }, {
	        "value": "Beech"
	    }, {
	        "value": "Birch"
	    }, {
	        "value": "Cherry"
	    }, {
	        "value": "Hazel"
	    }, {
	        "value": "Hornbeam"
	    }, {
	        "value": "Horse chestnut"
	    }, {
	        "value": "Lime"
	    }, {
	        "value": "London Plane"
	    }, {
	        "value": "Other"
	    }]
	}
*/