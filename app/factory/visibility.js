(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('factory')
		.factory('Visibility',['$log','$timeout',function($log,$timeout){
			function Visibility(props){
				if(typeof props.id !== 'string')
					throw new TypeError('Visibility object expects a string for id');
				if(typeof props.operator !== 'string')
					throw new TypeError('Visibility object expects a string for operator');
				if(typeof props.answer !== 'string')
					throw new TypeError('Visibility object expects a string for answer');
				this.id = props.id;
				this.operator = props.operator;
				this.answer = props.answer;
			}	
			(function(){
				this.evaluateAsync = function(variables,callback){
					var self = this;
					$timeout(function(){
						if(typeof callback === 'function'){
							try{
								callback(self.evaluate(variables));
							}catch(e){
								callback(false,e);
							}
						}	
					},0);
				};
				this.evaluate = function(variables){
					if(!variables.has(this.id)){
						throw new Error('idValue for '+this.id+' not defined while trying to '+
								'evaluate '+this.toString());
					}
					else{
						var idValue = variables.get(this.id);
						var found = false;
						var i=0,l=0;
						switch (this.operator) {
							case 'equal':
								if(typeof idValue === 'string')
									return idValue === this.answer;
								else if(typeof idValue === 'number')
									//This will not work if the number is coded as string
									return idValue === this.answer;	
								else if(Array.isArray(idValue)){
									found = false;
									for(i=0,l=idValue.length;i<l && !found;i++)
										if(idValue[i] === this.answer)
											found = true;
									return found;
								}
								else
									throw new Error('non-supported type for operator '+this.operator+
										' while trying to evaluate '+this.toString());
								break;
							case 'notEqual':
								if(typeof idValue === 'string')
									return idValue !== this.answer;
								else if(typeof idValue === 'number')
									//This will not work if the number is coded as string
									return idValue !== this.answer;	
								else if(Array.isArray(idValue)){
									found = false;
									for(i=0,l=idValue.length;i<l && !found;i++)
										if(idValue[i] === this.answer)
											found = true;
									return !found;
								}
								else
									throw new Error('non-supported type for operator '+this.operator+
										' while trying to evaluate '+this.toString());
								break;
							case 'greaterThan':
								if(typeof idValue === 'number')
									return idValue > this.answer;
								else
									throw new Error('non-supported type for operator '+this.operator+
										' while trying to evaluate '+this.toString());
								break;
							case 'smallerThan':
								if(typeof idValue === 'number')
									return idValue < this.answer;
								else
									throw new Error('non-supported type for operator '+this.operator+
										' while trying to evaluate '+this.toString());
								break;
							default :
								throw new Error('unknown operator while trying to '+
									'evaluate '+this.toString());
						}
					}
				};
				this.toString = function(){
					return 'Visibility Object { id: '+this.id+', operator: '+this.operator+', '+
					'answer: '+this.answer+' }';
				};
			}).call(Visibility.prototype);
			return Visibility;
		}]);
})(this.window);