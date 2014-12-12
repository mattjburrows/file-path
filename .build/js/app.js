'use strict';

(function () {
    angular
        .module('app', [
            'ui-router',
            'ngCookies'
        ])
        .config([
            '$stateProvider',
            '$locationProvider',
            'app.profile',
            'app.users',
            'app.repos',
            appConfig
        ]);

    function appConfig ($stateProvider, $locationProvider) {
        $stateProvider.state('home', {
            url: '/profile',
            templateUrl: '/js/profile/profile.html',
            controller: 'MapController'
        });
    };
})();
