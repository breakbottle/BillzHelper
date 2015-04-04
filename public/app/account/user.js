/**
 * Author: Clint Small Cain
 * Date: 4/4/2015
 * Time: 10:22 AM
 * Description:
 */
application.factory('bilUser',function($resource){
    var userResource = $resource('/home/user/:id',{_id: "@id"});

    return userResource;
});