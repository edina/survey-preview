(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('component')
		.component('fieldTextArea',{
			templateUrl: 'partials/fieldTextArea.html',
			controller: ['$log','pcapiService',function($log,pcapiService){
				var self = this;
				this.response = undefined;
				this.$onInit = function(){
					$log.debug('fieldTextArea.$onInit: %o',self);
				};
				this.hasImage = function(){
					return this.obj.properties['image-caption'] !== undefined ||
						this.obj.properties.imageCaption !== undefined;
				};
				this.getImageSrc = function(){
					var src = this.obj.properties['image-caption'] !== undefined ? 
						this.obj.properties['image-caption'].src : this.obj.properties.imageCaption.src;
					return pcapiService.getEditorAssetURL(this.sid,src);
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
    	"placeholder": "Place default text here (if any)",
    	"image-caption": {"src": "filename.jpg"}
	}
*/