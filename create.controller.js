angular.module('app')
    .controller('createController', function ($state, $http, $rootScope, $timeout, $window) {
        this.username = "";
        this.password = "";
        this.password2 = "";
        this.passwordok = false;
        this.usernameok = false;

        this.cancel = function (ctrl) {
            $state.go('home');
        };
        this.create = function (ctrl) {
            if( ctrl.password === ctrl.password2){
                var crt = new Object;
                crt.username = ctrl.username;
                crt.password = ctrl.password;
                var promise = $http.post("http://mikeg.westus2.cloudapp.azure.com:8080/createLogin", JSON.stringify(crt));
                promise.success(function (data) {
                    if( data === "ok"){
                       $state.go('home');
                    } else {
                       ctrl.usernameok = true;
                    }
                    return 1;
                });
                promise.error(function (data, status, headers, config) {
                    return 0;
                });
            } else {
                ctrl.passwordok = true;
            }
        };
    });