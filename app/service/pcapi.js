(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('service')
		.service('pcapiService',['$q','$http','$log','__ENV',function($q,$http,$log,__ENV){
			this.getEditor = function(sid){
				//http://localhost/1.3/pcapi/editors/local/00000000-0000-0000-0000-000000000000/survey_test.json
				if(typeof sid !== 'string')
					throw new TypeError('A string parameter is expected for sid');
				var deferred = $q.defer();
				$http({method:'GET',url:__ENV.pcapi.baseUrl+'/'+
					__ENV.pcapi.version+'/pcapi/editors/local/'+__ENV.pcapi.userId+'/'+sid+'.json'})
				.then(function(success){
					if(success.data.error)
						deferred.reject(success.data);
					else
						deferred.resolve(success.data);

				},function(error){
					deferred.reject(error);
				});
				return deferred.promise;
			};
			this.getEditorAssetsBaseURL = function(sid){
				//http://localhost/1.3/pcapi/editors/local/00000000-0000-0000-0000-000000000000/survey_test
				if(typeof sid !== 'string')
					throw new TypeError('A string parameter is expected for sid');
				return __ENV.pcapi.baseUrl+'/'+
					__ENV.pcapi.version+'/pcapi/editors/local/'+__ENV.pcapi.userId+'/'+sid;
			};
			this.getEditorAssetURL = function(sid,src){
				//http://localhost/1.3/pcapi/editors/local/00000000-0000-0000-0000-000000000000/survey_test/cat.jpg
				if(typeof src !== 'string')
					throw new TypeError('A string parameter is expected for src');
				return this.getEditorAssetsBaseURL(sid)+'/'+src;
			};
		}]);
})(this.window);