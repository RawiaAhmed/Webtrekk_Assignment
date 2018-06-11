angular.module('webtrekk').controller('CustomerDetailsCtrl', function($scope, $stateParams, customerService, $state, $mdDialog, $mdToast) {

    // initialization function to populate the data into the form in case of update
    // or init a new customer object in case of add new customer
    $scope.initCustomerData = function() {
        if ($stateParams.customer) {
            $scope.customer = $stateParams.customer;
            $scope.customer.birthday = new Date($scope.customer.birthday);
        } else {
            $scope.customer = {
                name: {
                    first: '',
                    last: ''
                },
                birthday: new Date(),
                customerLifetimeValue: 0,
                gender: 'm',
                lastContact: new Date()
            };
        }
    };

    $scope.initCustomerData();

    // checks for form errors first if there isn't any it calls the servic of update in case of update view
    // or add new customer in case of new object (without id)
    $scope.saveContact = function() {
        if ($scope.customerForm.$invalid) {
            $mdToast.show(
                $mdToast.simple()
                .textContent('Complete customer data first')
            );
            return;
        }
        if ($scope.customer.customerID) {
            customerService.updateCustomerInfo($scope.customer.customerID, $scope.customer).then(function() {
                $state.go('home');
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Updated Successfully!')
                );
            });
        } else {
            customerService.addCustomerInfo($scope.customer).then(function() {
                $state.go('home');
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Saved Successfully!')
                );
            });
        }
    };

    $scope.cancel = function() {
        var confirm = $mdDialog.confirm()
            .title('Cancel')
            .textContent('Are you sure you want to cancel your changes?')
            .ok('Ok')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $state.go('home');
        }, function() {});
    };

});