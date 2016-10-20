(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('directive')
		.directive('visibility',['$log','$timeout','Visibility',function($log,$timeout,Visibility){
			return{
				restrict: 'E',
				template: '<div ng-show="$ctrl.visibilityResult"><ng-transclude></ng-transclude></div>',
				bindToController: true,
				scope: {obj:'<obj',responses:'<responses'},
				controller: [function(){
					var self = this;
					this.visibilityResult = false;
					this.visibility = undefined;
					this.$onInit = function(){
						if(this.obj !== undefined)
							this.visibility = new Visibility(this.obj);
						else
							this.visibilityResult = true;
						$log.debug('visibility.$onInit: %o',self);
					};
					this.$onChanges = function(changesObj){
						if(changesObj.responses){
						var responseObj = changesObj.responses;
						if(!responseObj.isFirstChange()){
							if(this.visibility!==undefined){
								this.visibility.evaluateAsync(responseObj.currentValue,function(result,error){
									if(error!==undefined)
										$log.debug(error);
									$log.debug('%o is evaluated to %o',
										self.visibility.toString(),result);
									$timeout(function(){self.visibilityResult = result;},0);
								});
							}
						}
					}
					};
				}],
				controllerAs: '$ctrl',
				transclude: true
			};
		}]);
})(this.window);