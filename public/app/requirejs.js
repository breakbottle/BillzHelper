/**
 * Author: Clint Small Cain
 * Date: 4/22/2015
 * Time: 8:41 AM
 * Description:
 */
application.factory('RequireJs',function($q,$rootElement,$injector){
    //requires services and factories files when needed.
    return function(requireList,returnInstance){

        var promise = $q.defer();
        require(requireList,function(d){//note: do not upgrade to v2.1.17 not resolving both items in list..need to verify this works
            var resolved  = {};
            if(angular.isArray(requireList)){
                var loadedAlready = false;
                angular.forEach(requireList,function(value,key){
                    if(require.s.contexts._.defined[value]){//requireJs has loaded the files, and we have populated the values, let's return the resolved value
                        resolved[value] = require.s.contexts._.defined[value].resolved;
                        loadedAlready = true;
                    }
                });
                if(!loadedAlready){//only run this if object is not already loaded.
                    var reloadInjector = angular.injector([application.name]);//reload app for injected options;
                    angular.forEach(requireList,function(value,key){
                        var inject = (!$injector.has(value))?reloadInjector:$injector;
                        var re = inject.get(value);

                        resolved[value] = re;
                        require.s.contexts._.defined[value] = {
                            required:require.s.contexts._.defined[value],
                            resolved: re
                        };
                    });
                }

            }
            promise.resolve(resolved);
        });
        return promise.promise;

    };

});