/**
 * Author: Clint Small Cain
 * Date: 4/11/2015
 * Time: 12:35 PM
 * Description:
 */
application.factory('bilLocation',function($location,bilDebug){
    return function(path,newspa){
        if(newspa){
            location.href=path;
        } else {
            $location.path(path);
        }
    }
});