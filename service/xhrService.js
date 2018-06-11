angular.module('webtrekk').factory('xhrService', function($http, $q, $rootScope) {

    var xhrService = {};

    xhrService.baseURL = '';

    xhrService.callService = function(params) {
        var finalParams = angular.extend({}, {
            timeout: 20 * 1000,
            cache: false,
            data: null,
            params: null,
            method: 'GET',
            responseType: "",
        }, params);
        finalParams.url = xhrService.baseURL + params.url;
        finalParams.data = params.data;
        if (!navigator.onLine) {
            $rootScope.showAlert('Connection error', 'Please fix your connection and try again later !');
            return $q.reject('offline');
        } else {
            $rootScope.showSpinner = true;
            return $http(finalParams).then(function(response) {
                $rootScope.showSpinner = false;
                return $q.when(response.data);
            }, function(error) {
                $rootScope.showSpinner = false;
                $rootScope.showAlert('Service error', error);
                return $q.reject(error);
            });
        }
    };

    return xhrService;
});