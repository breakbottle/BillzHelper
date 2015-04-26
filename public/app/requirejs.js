/**
 * Author: Clint Small Cain
 * Date: 4/22/2015
 * Time: 8:41 AM
 * Description:
 */
application.factory('RequireJs',function($q,$rootElement,$injector){
    //requires services and factories files when needed.
    return function(requireList,returnInstance){
        require.config({
            baseUrl: '',
            paths: {

                'bilAlerts':['app/common/alerts'],
                'bilLocation':['app/common/mspa-location'],
                'bilDebug':['app/common/debug'],
                'test':['app/common/test']
                /*
                 Example:
                 Usage - cal factory name, give list of variables names, then list of services and factories to inject
                 RequireJs(['bilDebug','test']).then(function(k){
                 console.log("what is k", )
                 })
                 */

            }
        });
        var promise = $q.defer();
        require(requireList,function(d){
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