angular.module('webtrekk').factory('customerService', function(xhrService, $q, $rootScope) {

    var customerService = {};
    if (window.localStorage.customerInfo) {
        customerService.customerInfo = JSON.parse(window.localStorage.customerInfo);
    } else {
        customerService.customerInfo = [];
    }

    // service calling the xhr service from the json file containing the sample data 
    customerService.getCustomerData = function() {
        return xhrService.callService({
            url: 'service/customerInfo.json',
        });
    };

    // service calling getCustomerData and executing logic after data comes 
    // (caching and saving to localStorage) and returns array of customers
    customerService.getCustomerDataLogic = function() {
        if (!window.localStorage.customerInfo) {
            return customerService.getCustomerData().then(function(response) {
                customerService.customerInfo = response;
                window.localStorage.customerInfo = JSON.stringify(response);
                return $q.when(response);
            });
        } else {
            customerService.customerInfo = JSON.parse(window.localStorage.customerInfo);
            return $q.when(JSON.parse(window.localStorage.customerInfo));
        }
    };

    // given customerId and new customer data object it searches for the original object 
    // then replace it with the new one and return array of customers
    customerService.updateCustomerInfo = function(customerId, customerData) {
        $rootScope.showSpinner = true;
        var customerIndex = customerService.customerInfo.findIndex(function(item) {
            return item.customerID === customerId;
        });
        customerService.customerInfo[customerIndex] = angular.copy(customerData);
        window.localStorage.customerInfo = JSON.stringify(customerService.customerInfo);
        $rootScope.showSpinner = false;
        return $q.when(customerService.customerInfo);
    };

    // given customerId it searches for the original object 
    // then replace it with the new one and return array of customers
    customerService.deleteCustomerInfo = function(customerId) {
        $rootScope.showSpinner = true;
        var customerIndex = customerService.customerInfo.findIndex(function(item) {
            return item.customerID === customerId;
        });
        customerService.customerInfo.splice(customerIndex, 1);
        window.localStorage.customerInfo = JSON.stringify(customerService.customerInfo);
        $rootScope.showSpinner = false;
        return $q.when(customerService.customerInfo);
    };

    // given a customer object the functions adds an id to the new object then adds it to the 
    // original list, cache it and save it to localStorage and return array of customers
    customerService.addCustomerInfo = function(customerInfo) {
        $rootScope.showSpinner = true;
        customerInfo.customerID = customerService.customerInfo.length;
        customerService.customerInfo.push(customerInfo);
        window.localStorage.customerInfo = JSON.stringify(customerService.customerInfo);
        $rootScope.showSpinner = false;
        return $q.when(customerService.customerInfo);
    };

    return customerService;
});