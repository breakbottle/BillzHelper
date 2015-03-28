/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 5:35 PM
 * Description:
 */
application.controller('bilHomeCtrl',function($scope,bilIdentity){
    $scope.myvariable = "Home Header";
    $scope.identity = bilIdentity;
});