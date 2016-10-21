(function(window){
	'use strict';
	var angular = window.angular;
	var bootstrapModule = angular.module('bootstrapModule',[]);
	var bootstrapContainer = document.createElement('div');

	function bootstrapApp(appName,data){
		var appModule = angular.module(appName);
		appModule.constant('__ENV',data);
		angular.bootstrap(document,[appName]);
	}

	bootstrapModule.service('bootstrapService',['$q','$http',function($q,$http){
		this.getEnv = function(){
			var deferred = $q.defer();
			$http({method:'GET',url:'env.json',cache:true}).then(
				function(success){
					deferred.resolve(success.data);
				},
				function(error){
					deferred.reject(error);
				}
			);
			return deferred.promise;
		};
	}]);
	
	bootstrapModule.run(['$log','bootstrapService',function($log,bootstrapService){
		bootstrapService.getEnv().then(
			function(data){
				bootstrapApp('app',data);
				bootstrapContainer.remove();
			},
			function(error){
				$log.debug(error);
			}
		);
	}]);

	angular.element(document).ready(function(){
		angular.bootstrap(bootstrapContainer,['bootstrapModule']);
	});

})(this.window);