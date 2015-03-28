/**
 * Author: Clint Small Cain
 * Date: 3/23/2015
 * Time: 8:39 PM
 * Description:
 */
application.factory('bilAuth',function($http,bilIdentity,$q){
    return {
        authenticatedUser: function(username,password){
            var deferred = $q.defer();
            $http.post('/login',{username:username,password:password}).then(function(response){

                if(response.data.success){
                    bilIdentity.currentUser = response.data.user;
                    //bilAlerts.notify("you in");
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                    //bilAlerts.notify("you fail")
               }
                return deferred
            });
        },
        logoutUser:function(){
            var deferred = $q.defer();
            $http.post('/logout',{logout:true}).then(function(){
                bilIdentity.currentUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;
        }
    }

});
application.factory("myFirstTest",function(){

    return {
        clint:"small"
    }
});