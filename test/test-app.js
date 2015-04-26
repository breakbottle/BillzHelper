/**
 * Author: Clint Small Cain
 * Date: 3/25/2015
 * Time: 9:40 PM
 * Description:
 */
angular.module('app',['ngResource']);//,'ngMockE2E'
var application = angular.module('app');
var toastr  = {};

var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec|mocks\.js$/.test(file)) {
            tests.push(file);
        }
    }
}
var boo = require.config({
    baseUrl: '/base/',
    paths: {
        //'require':['vendor/requirejs/require'],
        'bilAlerts':['public/app/common/alerts'],
        'bilLocation':['app/common/mspa-location'],
        'bilDebug':['public/app/common/debug'],
        'mochas':['node_modules/mocha/mocha'],
        'test':['public/app/main']
    },
    deps:tests,
    callback: window.__karma__.start
});
