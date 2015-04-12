/**
 * Author: Clint Small Cain
 * Date: 4/11/2015
 * Time: 12:35 PM
 * Description:
 */
application.factory('bilLocation',function($location,bilDebug){
    var path =  function(path,newspa){

        if(newspa){
            location.href=path;
        } else {
            if($location.$$path == spaPath()){
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

    return {
        path:path,
        spaPath:spaPath
    }
});