/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 4:08 PM
 * Description:
 */
application.controller('bilSignupCtrl',function(bilDebug,$scope,bilIdentity,RequireJs,bilAuth,bilLocation){
    if(bilIdentity.isAuthenticated()){ 
        bilLocation.path("/",true);
        return;
    }

    $scope.identity = bilIdentity;
    $scope.userName = "";
    $scope.userPassword = "";
    $scope.userEmail = "";
    $scope.create = function(userEmail,userName,userPassword){
        $scope.isLoading = true;
        RequireJs(['bilAlerts']).then(function(resolver) {
            if (this.bilSignupFom.$valid) {

                bilAuth.signUpUser(userEmail, userName, userPassword).then(function (success) {
                    resolver.bilAlerts.notify('account was good');
                    $scope.isLoading = false;
                    bilLocation.path("/", true);
                }, function (reason) {
                    $scope.isLoading = false;
                    resolver.bilAlerts.error(reason);
                });
            } else {
                $scope.isLoading = false;
                resolver.bilAlerts.error("Fully complete form with valid values to sign up!");
            }
        }.bind(this));
    }
});