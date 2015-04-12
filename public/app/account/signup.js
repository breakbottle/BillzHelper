/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 4:08 PM
 * Description:
 */
application.controller('bilSignupCtrl',function(bilDebug,$scope,bilIdentity,bilAlerts,bilAuth,bilLocation){
    if(bilIdentity.isAuthenticated()){ 
        bilLocation.path("/",true);
    }

    $scope.identity = bilIdentity;
    $scope.userName = "";
    $scope.userPassword = "";
    $scope.userEmail = "";
    $scope.create = function(userEmail,userName,userPassword){
        if(this.bilSignupFom.$valid){
            bilAuth.signUpUser(userEmail,userName,userPassword).then(function(success){
                bilAlerts.notify('account was good');
                bilLocation.path("/",true);
            },function(reason){
                bilAlerts.error(reason);
            });
        } else {
            bilAlerts.error("Fully complete form with valid values to sign up!");
        }
    }
});