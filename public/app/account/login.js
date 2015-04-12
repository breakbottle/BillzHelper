/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 5:47 PM
 * Description:
 */
application.controller('bilLoginCtrl',function($scope,bilAuth,bilAlerts,bilIdentity,bilLocation,$location){
    $scope.identity = bilIdentity;

    var resetUser = function(){
        $scope.username = "";
        $scope.password = "";
    };
    resetUser();
    $scope.login = function(username,password){
        if(this.bilLoginForm.$valid){
            bilAuth.authenticatedUser(username,password).then(function(success){

                if(success){
                    bilAlerts.notify("Login Successful");
                    bilLocation.path('/');
                } else {
                    bilAlerts.error("There were errors trying to log you in!")
                }
            });
        } else {
            bilAlerts.error("Please enter your username and password")
        }
    };
    $scope.logout = function(){
        bilAuth.logoutUser().then(function(){
            resetUser();
            bilAlerts.notify("you out");
            bilLocation.path('/',true);
        });
    };
    $scope.singup = function(){
        bilLocation.path("/account/signup",true);
    };

});