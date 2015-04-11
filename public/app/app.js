/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 8:52 AM
 * Description:
 */
angular.module('app',['ngResource','ui.router']);
var application = angular.module('app');
/*
application.config(function($routeProvider,$locationProvider){
   $locationProvider.html5Mode(true);
    $routeProvider
        .when('/',{
            templateUrl: '/partials/home/home',
            controller:'bilHomeCtrl'
        }).when('/home',{
            templateUrl: '/partials/home/home',
            controller:'bilHomeCtrl'
        }).when('/home/index',{
            templateUrl: '/partials/home/home',
            controller:'bilHomeCtrl'
        })
});*/

application.config(function($stateProvider,$urlRouterProvider){

    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.when("/a566","/account/signup");

    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('/',{
        url:'/',
        templateUrl: '/partials/home/home',
        controller:'bilHomeCtrl'
    }).state('signup',{
            url:'/account/signup',
            controller:'bilSignupCtrl'
        })
});