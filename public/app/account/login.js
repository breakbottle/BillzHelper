/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 5:47 PM
 * Description:
 */
application.controller('bilLoginCtrl',function($scope,bilAuth,bilIdentity,bilLocation,RequireJs){
    $scope.identity = bilIdentity;
    var resetUser = function(){
        $scope.username = "";
        $scope.password = "";
    };
    resetUser();
    $scope.login = function(username,password){
        $scope.isLoading = true;
        RequireJs(['bilAlerts']).then(function(resolver) {
            if (this.bilLoginForm.$valid) {
                bilAuth.authenticatedUser(username, password).then(function (success) {
                    $scope.isLoading = false;
                    if (success) {
                        resolver.bilAlerts.notify("Login Successful");
                        bilLocation.path('/');
                    } else {
                        resolver.bilAlerts.error("There were errors trying to log you in!")
                    }
                });
            } else {
                resolver.bilAlerts.error("Please enter your username and password");
                $scope.isLoading = false;
            }
        }.bind(this));
    };
    $scope.logout = function(){
        bilAuth.logoutUser().then(function(){
            resetUser();
            bilLocation.path('/',true);
        });
    };
    $scope.singup = function(){
        bilLocation.path("/account/signup",true);
    };

});