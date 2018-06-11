describe('CustomerDetailsCtrl', function() {

    beforeEach(module('webtrekk'));

    var scope, ctrl, mdDialog, q, mdToast;

    beforeEach(inject(function($rootScope, $controller, $mdDialog, $injector, $mdToast) {
        scope = $rootScope.$new();
        ctrl = $controller('CustomerDetailsCtrl', { $scope: scope });
        mdDialog = $mdDialog;
        mdToast = $mdToast;
        q = $injector.get("$q");
    }));

    it('should test init customer object', inject(function() {
        scope.initCustomerData();
        expect(scope.customer).toBeDefined();
    }));

    it('should test save customer object', inject(function() {
        scope.customer = {
            name: {
                first: '',
                last: ''
            },
            birthday: new Date(),
            customerLifetimeValue: 10,
            gender: 'm',
            lastContact: new Date()
        };
        scope.customerForm = {};
        scope.customerForm.$invalid = true;
        spyOn(mdToast, 'show').andCallFake(function() {
            var deferred = q.defer();
            deferred.resolve();
            return deferred.promise;
        });
        scope.saveContact();
        expect(mdToast.show).toHaveBeenCalled();
    }));

    it('should test cancel function', inject(function() {
        spyOn(mdDialog, 'show').andCallFake(function() {
            var deferred = q.defer();
            deferred.resolve();
            return deferred.promise;
        });
        scope.cancel();
        expect(mdDialog.show).toHaveBeenCalled();
    }));

});