/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 4:08 PM
 * Description:
 */
application.controller('bilSignupCtrl',function($scope,bilIdentity,bilAlerts,bilAuth){
    $scope.identity = bilIdentity;
    $scope.username = "";
    $scope.password = "";
    $scope.create = function(username,password){
        bilAuth.signUpUser(username,password).then(function(success){
            if(success){
                bilAlerts.notify("got someting");
            } else {
                bilAlerts.notify("you uuuuuuu")
            }
        });
    };
});