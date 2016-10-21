(function(){
	'use strict';
	 describe('component: fieldText', function(){
	 	var $componentController;

	 	beforeEach(module('component'));
	 	beforeEach(inject(function(_$componentController_){
	 		$componentController = _$componentController_;
	 	}));

	 	it('should expose a field property', function(){
	 		var bindings = {obj: {'id':'text-1','type':'text',
							'required':false,'persistent':false,'properties':{'prefix':'',
							'placeholder':'Type here your text',
							'max-chars':'10'},'label':'Text label'}};
	 		var $ctrl = $componentController('fieldText',null,bindings);
	 		expect($ctrl.obj).toBeDefined();
	 	});

	 	it('should call responseChange binding when response change', function(){
	 		var responseChangeSpy = jasmine.createSpy();
	 		var bindings = {obj: {'id':'text-1','type':'text',
							'required':false,'persistent':false,'properties':{'prefix':'',
							'placeholder':'Type here your text',
							'max-chars':'10'},'label':'Text label'},
							responseChange: responseChangeSpy};
	 		var $ctrl = $componentController('fieldText',null,bindings);

	 		$ctrl.response = 'This is the text entered';
	 		$ctrl.change();
	 		expect(responseChangeSpy).toHaveBeenCalledWith(
	 			{objResponse: {id:$ctrl.obj.id,response:$ctrl.response}});
	 	});
	 });
})();