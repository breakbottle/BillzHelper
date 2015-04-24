/**
 * Author: Clint Small Cain
 * Date: 4/11/2015
 * Time: 12:35 PM
 * Description:
 */
application.factory('bilLocation',function($http,$location,bilDebug,bilIdentity){
    var path =  function(path,refreshPath){

        if(refreshPath){
            location.href=path;
        } else {
            if(!$location.$$path || $location.$$path == spaPath()){
                $location.path(path);
            } else {
                location.href=spaPath()+'/#'+path;
            }

        }
    };
    var spaPath = function(){
      var location = $location.$$absUrl;
      var spaPath = location.replace($location.$$protocol+'://'+$location.$$host+(($location.$$port)?':'+$location.$$port:''),'').split('#');
      return spaPath[0];
    };
    var setLocation = function(path){
        $location.path(path);
    };
    var noAuth = function(){
        if(!bilIdentity.isAuthenticated()){
            //path("/",true);
            return true;
        }
        return false;
    };

    return {
        path:path,
        noAuth:noAuth,
        setLocation:setLocation,
        spaPath:spaPath
    }
});