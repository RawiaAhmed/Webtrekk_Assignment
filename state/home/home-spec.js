describe('HomeCtrl', function() {

    beforeEach(module('webtrekk'));

    var scope, ctrl, mdDialog, q;

    beforeEach(inject(function($rootScope, $controller, $mdDialog, $injector) {
        scope = $rootScope.$new();
        ctrl = $controller('HomeCtrl', { $scope: scope });
        mdDialog = $mdDialog;
        q = $injector.get("$q");
    }));

    it('should init customer information', inject(function() {
        scope.initCustomers();
        expect(scope.customers).toBeDefined();
        expect(scope.formatDate('2017-06-01T23:28:56.782Z')).toEqual('June 2nd 2017, 1:28:56 am');
        expect(scope.formatBirthDate('1996-10-12')).toEqual('1996-10-12');
    }));

    it('should test date format', inject(function() {
        expect(scope.formatDate('2017-06-01T23:28:56.782Z')).toEqual('June 2nd 2017, 1:28:56 am');
    }));

    it('should test birthdate format', inject(function() {
        expect(scope.formatBirthDate('1996-10-12')).toEqual('1996-10-12');
    }));

    it('should test delete customer', inject(function() {
        spyOn(mdDialog, 'show').andCallFake(function() {
            var deferred = q.defer();
            deferred.resolve();
            return deferred.promise;
        });
        scope.deleteCustomer();
        expect(mdDialog.show).toHaveBeenCalled();
    }));

});