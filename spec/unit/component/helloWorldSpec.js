(function(){
	'use strict';
	 describe('component: helloWorld', function(){
	 	var $componentController;

	 	beforeEach(module('component'));
	 	beforeEach(inject(function(_$componentController_){
	 		$componentController = _$componentController_;
	 	}));

	 	it('should expose a name property', function(){
	 		var bindings = {name: 'Jose'};
	 		var $ctrl = $componentController('helloWorld',null,bindings);
	 		expect($ctrl.name).toBeDefined();
	 		expect($ctrl.name).toBe('Jose'); 
	 	});
	 });
})();