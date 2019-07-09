angular.module('app')
    .controller('chatController', function ($state, $http, $rootScope, $timeout, $window) {
        this.userId;
        this.userList;
        this.toUserName;
        this.toUserId;

        this.loadUserlist = function(ctrl){

        };

        this.loadMessages = function(ctrl){

        };

        this.SendMessage = function(ctrl){

        };

        this.initalize = function(ctrl){
            ctrl.userId =  $rootScope.userId;
            //load the list of users  
            loadUserlist(ctrl); 
        };

        this.initalize(this);

    });