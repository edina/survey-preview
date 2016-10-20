(function(window){
	'use strict';
	var angular = window.angular;
	var Immutable = window.Immutable;
	angular.module('component')
		.component('surveyPreview',{
			templateUrl: 'partials/surveyPreview.html',
			controller: ['$log','pcapiService',function($log,pcapiService){
				var self = this;
				this.editor = undefined;
				this.responses = Immutable.Map({});	//key-->field.id, value--> string|number|[string]
				this.error = undefined;
				this.$onInit = function(){
					$log.debug('surveyPreview.$onInit: %o',self);
					pcapiService.getEditor(this.sid).then(
						function(data){
							self.editor = data;
						},
						function(error){
							self.error = error;
						}
					);
				};
				/*
					@param objResponse : is an object {id: string, response: string|number|[string]}
				*/
				this.responseChange = function(objResponse){
					if(objResponse!==undefined){
						if(typeof objResponse.id === 'string'){
							//Avoids object mutation
							this.responses = this.responses.set(objResponse.id,objResponse.response);	
						}
					}
				};
			}],
			bindings: {
				'sid': '@'
			}
		});
})(this.window);