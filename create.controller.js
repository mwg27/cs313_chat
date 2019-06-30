angular.module('app')
    .controller('createController', function ($state, $http, $rootScope, $timeout, $window) {
        this.username = "";
        this.password = "";

        this.cancel = function (ctrl) {
            $state.go('home');
        };
        this.create = function (ctrl) {
            var crt = new Object;
            crt.username = "bill";
            crt.password = "2345";
            var promise = $http.post("http://mikeg.westus2.cloudapp.azure.com:8080/createLogin", JSON.stringify(crt));
            promise.success(function (data) {
                return 1;
            });
            promise.error(function (data, status, headers, config) {
                return 0;
            });
            $state.go('home');
        };
    });