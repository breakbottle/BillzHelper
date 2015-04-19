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
            chai.expect(route.testable.requestFilter({method:'POST'},action(function(){},true).post(function(){}))).to.be.true;
        });
        it('Request Method GET on action should accept get',function(){
            chai.expect(route.testable.requestFilter({method:'GET'},action(function(){},true,true))).to.be.true;
        });
    });
    describe('routing',function(){
        it('should return all globals that is used in action/views',function(){
            var mockResponse = httpMocks.createResponse();
            var mockRequest =  httpMocks.createRequest({
                method: 'GET',
                url: '/account/index'
            });
            //test index path
            mockRequest._parsedOriginalUrl = {
                pathname:"/account/index"
            };
            var globals = route.request(mockRequest,mockResponse,{});
            chai.expect(globals).to.have.property('loggedInUser');
            //test login path
            mockRequest._parsedOriginalUrl = {
                pathname:"/account/login"
            };
            globals = route.request(mockRequest,mockResponse,{});
            chai.expect(globals).to.have.property('loggedInUser');
            //test logout path
            mockRequest._parsedOriginalUrl = {
                pathname:"/account/logout"

            };
            mockRequest.logout = function(){};
            globals = route.request(mockRequest,mockResponse,{});
            chai.expect(globals).to.have.property('loggedInUser');
            //test
            mockRequest._parsedOriginalUrl = {
                pathname:"/account/signup"
            };
            globals = route.request(mockRequest,mockResponse,{});
            chai.expect(globals).to.have.property('loggedInUser');
        });
        /*//test create using...after need to apply a delete of this test user until then keep commented out.
        it("router Create User POST to sign up integrated test",function(){
            var mockResponse = httpMocks.createResponse();
            var mockRequest =  httpMocks.createRequest({
                method: 'POST'
            });
            mockRequest._parsedOriginalUrl = {
                pathname:"/account/signup"
            };
            mockRequest.body = {userName:"test",userPassword:"test",userEmail:"test@email.com"};
            var globals = route.request(mockRequest,mockResponse,{});
            console.log("globals",globals);
            chai.expect(globals).to.have.property('loggedInUser');
        });*/
    });
});