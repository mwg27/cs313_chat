angular.module('app', ['ui.router', 'ngMaterial'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state({
                name: 'home',
                url: '/',
                templateUrl: 'home.html',
                controller: 'homeController',
                controllerAs: 'hctrl'
            })

            .state({
                name: 'create',
                url: '/create',
                templateUrl: 'create.html',
                controller: 'createController',
                controllerAs: 'cctrl'
            })

            .state({
                name: 'chat',
                url: '/chat',
                templateUrl: 'chat.html',
                controller: 'chatController',
                controllerAs: 'ctrl'
            });
    })

    .controller('navController', function ($http) {

    })

    .run(function () {

    });
