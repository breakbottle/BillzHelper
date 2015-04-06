/**
 * Author: Clint Small Cain
 * Date: 3/23/2015
 * Time: 8:39 PM
 * Description:
 */
application.factory('bilAuth',function(bilDebug,$http,bilIdentity,$q,bilUser){
    return {
        authenticatedUser: function(username,password){
            var deferred = $q.defer();
            var data = {username:username,password:password};
            $http.post('/account/login',data).then(function(response){

                if(response.data.success){
                    var user = new bilUser();
                    angular.extend(user,response.data.user);
                    bilIdentity.currentUser = user;
                    bilDebug("bilAuth","success from auth",user);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                    bilDebug("bilAuth","fail from auth",data,response);
               }

            });
            return deferred.promise;
        },
        logoutUser:function(){
            var deferred = $q.defer();
            $http.post('/account/logout',{logout:true}).then(function(){
                bilIdentity.currentUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;
        },
        signUpUser:function(username,password){
            var deferred = $q.defer();
            var newUser = new bilUser({username:username,password:password});
            newUser.$save().then(function(){
                bilIdentity.currentUser = newUser;
                deferred.resolve();
            }, function(response){
                deferred.reject(response.data.reason);
            });

            /*
            $http.post('/account/signup',{username:username,password:password}).then(function(response){

                if(response.data.success){
                    bilIdentity.currentUser = response.data.user;
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });*/
            return deferred.promise;
        }
    }

});
