(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldCheckBox',{
			templateUrl: 'partials/fieldCheckBox.html',
			controller: ['$log','pcapiService',function($log,pcapiService){
				var self = this;
				this.response = [];
				this.$onInit = function(){
					$log.debug('fieldCheckBox.$onInit: %o',self);
					for(var i=0;i<this.obj.properties.options.length;i++)
						this.response[i] = false;
				};
				this.hasImage = function($index){
					return this.obj.properties.options[$index].image !== undefined;
				};
				this.getImageSrc = function($index){
					return pcapiService.getEditorAssetURL(this.sid,
						this.obj.properties.options[$index].image.src);
				};
				this.change = function(){
					var responseArray = [];
					for(var i=0;i<this.response.length;i++)
						if(this.response[i])
							responseArray.push(this.obj.properties.options[i].value);
					this.responseChange({objResponse: {id:this.obj.id,response:responseArray}});
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
	        "value": "Brown leaf edges",
	        "image": {
	            "src": "15a.png"
	        }
	    }, {
	        "value": "Brown spots",
	        "image": {
	            "src": "15b.png"
	        }
	    }, {
	        "value": "Leaves all brown",
	        "image": {
	            "src": "15c.png"
	        }
	    }]
	}
*/