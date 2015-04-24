/**
 * Author: Clint Small Cain
 * Date: 4/22/2015
 * Time: 8:41 AM
 * Description:
 */
application.factory('RequireJs',function($q,$rootElement){
    //requires services and factories files when needed.
    return function(requireList,returnInstance){
        require.config({
            baseUrl: '',
            paths: {

                'bilAlerts':['app/common/alerts'],
                'bilLocation':['app/common/mspa-location'],
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
                angular.forEach(requireList,function(value,key){
                    var inject = angular.element($rootElement).injector();//use init options
                    if(!inject.has(value)){
                        inject = angular.injector([application.name]);//reload app for injected options
                    }
                    var re = inject.get(value);
                    if(angular.isFunction(re) && !returnInstance){
                        resolved[value] = re.call();
                    } else {
                        resolved[value] = re;
                    }
                });
            }
            promise.resolve(resolved);
        });
        return promise.promise;

    };

});