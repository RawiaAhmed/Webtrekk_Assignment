angular.module('webtrekk').controller('HomeCtrl', function($scope, customerService, $state, $mdDialog) {

    // initialization function to get all customers data
    $scope.initCustomers = function() {
        $scope.customers = [];
        customerService.getCustomerDataLogic().then(function(response) {
            $scope.customers = response;
        });
    };

    $scope.initCustomers();

    $scope.formatDate = function(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    };

    $scope.formatBirthDate = function(date) {
        return moment(date).format('YYYY-MM-DD');
    };

    $scope.navigateToDetails = function(customer) {
        $state.go('customer-details', { customer: customer });
    };

    // shows a confirmation message for the user to make sure he wants to delete
    // if he chooses yes it will delete it and refresh the view
    $scope.deleteCustomer = function(customerId) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Delete contact')
            .textContent('Are you sure you want to delete customer information?')
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            customerService.deleteCustomerInfo(customerId).then(function(response) {
                $scope.customers = response;
            });
        }, function() {});
    };
});