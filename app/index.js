(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('factory',[]);
	angular.module('service',[]);
	angular.module('directive',[]);
	angular.module('component',[]);
	var appModule = angular.module('app',['ui.router','factory','service','directive','component']);

	appModule.config(['$logProvider','__ENV',function($logProvider,__ENV){
		$logProvider.debugEnabled(__ENV.debug);
	}]);

	appModule.config(['$stateProvider','$urlRouterProvider',
		function($stateProvider,$urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			$stateProvider.state('home',{
				url: '/?sid',
				template: function(params){
					var dir = angular.element('<survey-preview></survey-preview>');
					dir.attr('sid',params.sid);
					return dir[0].outerHTML;
				},
				params:{
					sid: ''
				}
			});
		}
	]);
})(this.window);