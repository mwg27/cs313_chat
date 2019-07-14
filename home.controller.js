angular.module('app')
    .controller('homeController', function ($state, $http, $rootScope, $timeout, $window) {
        this.invalid = false;
        this.loginId;
        this.password;
        this.createAccount = function (ctrl) {
            $state.go('create');
        };

        this.login = function(ctrl) {
            var crt = new Object;
            crt.username = ctrl.loginId;
            crt.password = ctrl.password;
            var promise = $http.post("http://mikeg.westus2.cloudapp.azure.com:8080/login", JSON.stringify(crt));
            promise.success(function (data) {
                var id = parseInt(data);
                if( id >= 0){
                   $rootScope.userId = id;
                   $rootScope.userName = ctrl.loginId;
                   $state.go('chat');
                } else {
                    ctrl.invalid = true;
                }
                return 1;
            });
            promise.error(function (data, status, headers, config) {
                return 0;
            });           
        };
    });