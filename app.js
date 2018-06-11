angular.module('webtrekk', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngMaterial', 'ngMessages']);

angular.module('webtrekk').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'state/home/home.html'
    });
    $stateProvider.state('customer-details', {
        url: '/details',
        params: { customer: null },
        templateUrl: 'state/customer-details/customer-details.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('webtrekk').run(function($rootScope, $mdDialog) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $rootScope.showAlert = function(title, msg) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('.main-container')))
            .clickOutsideToClose(true)
            .title(title)
            .textContent(msg)
            // .ariaLabel('Alert Dialog Demo')
            .ok('Ok')
        );
    };

});