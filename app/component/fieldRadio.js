(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldRadio',{
			templateUrl: 'partials/fieldRadio.html',
			controller: ['$log','pcapiService',function($log,pcapiService){
				var self = this;
				this.response = undefined;
				this.$onInit = function(){
					$log.debug('fieldRadio.$onInit: %o',self);
				};
				this.hasImage = function($index){
					return this.obj.properties.options[$index].image !== undefined;
				};
				this.getImageSrc = function($index){
					return pcapiService.getEditorAssetURL(this.sid,
						this.obj.properties.options[$index].image.src);
				};
				this.change = function(){
					this.responseChange({objResponse: {id:this.obj.id,response:[this.response]}});
				};
			}],
			bindings: {
				'obj': '<',
				'responseChange': '&',
				'sid': '@'
			}
		});
})(this.window);
/*	e.g of attributes that can appear for its properties
	"properties": {
    	"other": true,
    	"options": [{
	        "value": "Street",
	        "image": {
	            "src": "5a.jpg"
	        }
	    }, {
	        "value": "Garden",
	        "image": {
	            "src": "5b.jpg"
	        }
	    }, {
	        "value": "School",
	        "image": {
	            "src": "5c.jpg"
	        }
	    }]
	}
*/