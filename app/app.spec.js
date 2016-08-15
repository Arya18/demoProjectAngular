  'use strict';

describe('PhoneListController', function() {

  beforeEach(module('phonecatApp'));

  it('should create a `product` model with 11 products', inject(function($controller) {
        var scope = {};
        var ctrl = $controller('PhoneListController', {$scope: scope});
        expect(scope.names.length).toBe(11);
        //expect(scope.logo).toBe('HCLDemo');
  }));

  it('should set a default value for the `orderProp` model', function($controller) {
        var scope = {};
        var ctrl = $controller('PhoneListController', {$scope: scope});
        expect(scope.orderProp).toBe('age');
    });
  
  it('should show logo name', inject(function($controller) {
        var scope = {};
        var ctrl = $controller('PhoneListController', {$scope: scope});
        //expect(scope.phones.length).toBe(3);
        expect(scope.logo).toBe('HCLDemo');
  }));
  
});
