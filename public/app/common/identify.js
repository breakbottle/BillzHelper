/**
 * Author: Clint Small Cain
 * Date: 3/23/2015
 * Time: 9:02 AM
 * Description:
 */
application.factory('bilIdentity',function($window,bilUser){
    var currentUser;
    if(!!$window.bilUO){
        currentUser = new bilUser();
        angular.extend(currentUser,$window.bilUO);
    }
    return {
        currentUser:currentUser,
        isAuthenticated:function(){
            return !! this.currentUser;
        }
    }
});