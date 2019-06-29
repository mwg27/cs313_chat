angular.module('app')
    .controller('homeController', function ($state, $http, $rootScope, $timeout, $window) {
        this.createAccount = function (ctrl) {
            $state.go('create');
        };
    });