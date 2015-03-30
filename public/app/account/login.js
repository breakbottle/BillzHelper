/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 5:47 PM
 * Description:
 */
application.controller('bilLoginCtrl',function($scope,bilAuth,bilAlerts,bilIdentity,$location){
    $scope.identity = bilIdentity;

    var resetUser = function(){
        $scope.username = "";
        $scope.password = "";
    };
    resetUser();
    $scope.login = function(username,password){
        bilAuth.authenticatedUser(username,password).then(function(success){
            if(success){
                bilAlerts.notify("you in");
            } else {
                bilAlerts.notify("you fail")
            }
        });
    };
    $scope.logout = function(){
        bilAuth.logoutUser().then(function(){
            resetUser();
            bilAlerts.notify("you out");
            $location.path('/');
        });
    };
    $scope.singup = function(){
      location.href = "/home/signup";
    };

});