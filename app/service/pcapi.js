(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('service')
		.service('pcapiService',['$q','$log','__ENV',function($q,$log,__ENV){
			var pcapi = window.pcapi;
			function init(){
				pcapi.init({
            		url: __ENV.pcapi.baseUrl,
           		 	version: __ENV.pcapi.version
       			});
			}
			this.getEditor = function(sid){
				if(typeof sid !== 'string')
					throw new TypeError('A string parameter is expected for sid');
				var deferred = $q.defer();
				pcapi.getEditor({remoteDir: 'editors', 
					userId: __ENV.pcapi.userId,
					item: sid+'.json'}
				).then(function(data){
						if(data.error){
							deferred.reject(data);
						}
						else
							deferred.resolve(data);
					},
					function(error){
						deferred.reject(error);
					}
				);
				return deferred.promise;
			};
			this.getEditorAssetsBaseURL = function(sid){
				if(typeof sid !== 'string')
					throw new TypeError('A string parameter is expected for sid');
				return pcapi.buildUserUrl(__ENV.pcapi.userId,'editors',sid);
			};
			this.getEditorAssetURL = function(sid,src){
				if(typeof src !== 'string')
					throw new TypeError('A string parameter is expected for src');
				return this.getEditorAssetsBaseURL(sid)+'/'+src;
			};
			init();
		}]);
})(this.window);