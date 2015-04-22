/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 8:52 AM
 * Description:
 */

//require('angular');
angular.module('app',['ngResource','ui.router','ngGrid']);
var application = angular.module('app');


application.config(function($stateProvider,$urlRouterProvider){

    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.when("/a566","/account/signup");
    console.log("oooohyyy",$urlRouterProvider)
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('/',{
        url:'/',
        //templateUrl: '/partials/home/home',
        controller:'bilListCtrl'
    }).state('signup',{
        url:'/account/signup',
        controller:'bilSignupCtrl'
    }).state('bills',{
            url:'/list/:itemId',
        templateUrl: '/partials/bills/bills-to-pay'
    })
});

application.factory('RequireJs',function($q){
    //requires services and factories files when needed.
    return function(requireList){
        require.config({
            baseUrl: '',
            paths: {
                /*
                'bilDebug':['app/common/debug'],
                'test':['app/common/test']

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
            var inject =  angular.injector([application.name]);
            var resolved = [];
            if(angular.isArray(requireList)){
                angular.forEach(requireList,function(value,key){
                    var re = inject.get(value);
                    if(angular.isFunction(re)){
                        var objectIn = {};
                        objectIn[value] = re.call();
                        resolved.push(objectIn);
                    } else {
                        resolved.push(re);
                    }

                });
            }
            promise.resolve(resolved);
        });
        return promise.promise;

    };

});
