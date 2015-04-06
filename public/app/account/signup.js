/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 4:08 PM
 * Description:
 */
application.controller('bilSignupCtrl',function(bilDebug,$scope,bilIdentity,bilAlerts,bilAuth,$location){
    $scope.identity = bilIdentity;
    $scope.username = "";
    $scope.password = "";
    $scope.create = function(username,password){
        bilAuth.signUpUser(username,password).then(function(success){
            bilAlerts.notify('acccount was good');
            //$location.path('/');

            /*if(success){
                bilAlerts.notify("got someting");
            } else {
                bilAlerts.error("you uuuuuuu")
            }*/
        },function(reason){
            bilAlerts.error(reason+" hi");
        });
    }
});