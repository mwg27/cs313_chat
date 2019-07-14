angular.module('app')
    .controller('chatController', function ($state, $http, $rootScope, $scope, $interval, $timeout, $window) {
        this.userId;
        this.userName;
        this.userList;
        this.toUserName;
        this.toUserId = -1;
        this.users;
        this.newMessage;
        this.messages;
        this.msgRefresh;
        this.scrollRefresh;


        this.loadUserlist = function(ctrl){
            var promise = $http.get("http://mikeg.westus2.cloudapp.azure.com:8080/users?id="+ctrl.userId);
            promise.success(function (data) {
                ctrl.users = data;
            }); 
            promise.error(function (data, status, headers, config) {
            });
        };

        this.setToUser = function(ctrl,name,id){
           ctrl.toUserName = name; 
           ctrl.toUserId = id; 
        };

        this.setScrollBottom = function(){
            var objDiv = document.getElementById("messageDiv");
            objDiv.scrollTop = objDiv.scrollHeight;
        }

        this.isSelectedUser = function(ctrl,id){
            var rc = "bkUserNotSelected";
            if( id === ctrl.toUserId)
                rc = "bkUserSelected";
            return rc;
        }

        this.loadMessages = function(ctrl){
            var promise = $http.get("http://mikeg.westus2.cloudapp.azure.com:8080/messages?id="+ctrl.userId);
            promise.success(function (data) {
                ctrl.messages = data;
            });
            promise.error(function (data, status, headers, config) {
            });
        };

        this.msgHeader = function(ctrl,fromId,toId){
            var from;
            var to;
            for(let i = 0; i < ctrl.users.length; i++){
                if( ctrl.users[i].id === toId)
                    to = ctrl.users[i].name;
                if( ctrl.users[i].id === fromId)
                    from = ctrl.users[i].name;
            }
            if( fromId === ctrl.userId)
                from = ctrl.userName;
            if( toId === ctrl.userId)
                to = ctrl.userName;
            var rc = from + " => " + to + "   ";
            return rc;
        }

        this.SendMessage = function(ctrl){
            if( ctrl.toUserId < 0)
            {
                alert("Select a User to send a message to");
            } else {
                var crt = new Object;
                crt.toUserId = ctrl.toUserId;
                crt.fromUserId = ctrl.userId;
                crt.message = ctrl.newMessage;
                var promise = $http.post("http://mikeg.westus2.cloudapp.azure.com:8080/send", JSON.stringify(crt));
                promise.success(function (data) {
                    ctrl.loadMessages(ctrl);
                    return 1;
                });
                promise.error(function (data, status, headers, config) {
                    return 0;
                });           
            }
            this.newMessage = "";
        };

        var initController = function (ctrl){
            ctrl.userId =  $rootScope.userId;
            ctrl.userName = $rootScope.userName;
            //load the list of users  
            ctrl.loadUserlist(ctrl); 
            ctrl.loadMessages(ctrl);
            $scope.ctrl = ctrl;
            if (typeof ctrl.msgRefresh === 'undefined')
                ctrl.msgRefresh = $interval(function () {
                $scope.ctrl.loadMessages($scope.ctrl);
            }, 2000);
            if (typeof ctrl.scrollRefresh === 'undefined')
                ctrl.scrollRefresh = $interval(function () {
                $scope.ctrl.setScrollBottom();
            }, 500);
        };

        if( typeof $rootScope.userId === 'undefined'){
            $state.go('home');
        } else {
            initController(this);
        }
    });