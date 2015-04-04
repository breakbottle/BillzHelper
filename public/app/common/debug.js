/**
 * Author: Clint Small Cain
 * Date: 4/4/2015
 * Time: 10:39 AM
 * Description:
 */
application.factory('bilDebug',function($window){
    var fancySpaces = function(count){
      var spaces = " ";
      for(var i=0;i < count;i++ ) {
          spaces += "  ";
      }
        return spaces;
    };
    return function(){
        if($window.bilCSL){//Client Side Logging is enabled.
            if(arguments.length == 1){
                console.log("LOGGING:",arguments);
            } else if(arguments.length > 1) {
                console.log("LOGGING----->");
                angular.forEach(arguments,function(value, key){
                   console.log(fancySpaces(key),value);
                });
                console.log("<-----");
            }

        }

    }
});