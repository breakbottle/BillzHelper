/**
 * Author: Clint Small Cain
 * Date: 4/2/2015
 * Time: 7:30 AM
 * Description:
 */

var chai = require('chai');
var httpMocks = require('node-mocks-http');
//var mocks = require('mocks');
var mocks = require('mock-request');
describe('router-manager',function(){
    var route;
    var __cwd = process.cwd();
    before(function(done){
        route = require(__cwd+'/server/includes/route-manager');
        done();
    });
    describe('routeVars',function(){
        var request;
        beforeEach(function(done){
            request = route.testable.routeVars({
                _parsedOriginalUrl:{
                    pathname:"/account/login"
                }
            });
            done();
        });
        it('Controller action should be login',function(){
            chai.expect(request).to.have.property('controllerAction').to.equal("login");
        });
        it('Instance should be an object and have an index property',function(){
           chai.expect(request).to.have.property('instance').to.have.property('index');
        });
    });
    describe('requestFilter',function(){
        //examples of testing filters
        var action = require(__cwd+'/server/models/controller-action');
        it('Request Method Post on action should accept post',function(){
            chai.expect(route.testable.requestFilter({method:'POST'},action(function(){},true))).to.be.true;
        });
        it('Request Method GET on action should accept get',function(){
            chai.expect(route.testable.requestFilter({method:'GET'},action(function(){},true,false))).to.be.true;
        });
    });
    describe('routing',function(){
        it('should return all globals that is used in action/views',function(){
            var mockResponse = httpMocks.createResponse();
            var mockRequest =  httpMocks.createRequest({
                method: 'GET',
                url: '/account/signup'
            });
            mockRequest._parsedOriginalUrl = {
                pathname:"/account/signup"
            };

            var globals = route.request(mockRequest,mockResponse,{});
            //console.log("working... ",globals)
            chai.expect(globals).to.have.property('loggedInUser')
        });
    });
});