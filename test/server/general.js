/**
 * Author: Clint Small Cain
 * Date: 4/11/2015
 * Time: 2:38 PM
 * Description:
 */
var chai = require('chai');
var httpMocks = require('node-mocks-http');
var mocks = require('mock-request');

describe("General Test",function(){
    describe('CreateUser',function(){
        var accountManager,clientError,eClientError,mockResponse,mockRequest,db;
        var __cwd = process.cwd();
        before(function(done){
            accountManager = require(__cwd+'/server/includes/account-manager');
            clientError = require(__cwd+'/server/includes/client-errors');
            eClientError = require(__cwd+'/server/enums/client-error-enums');
            db = require(__cwd+'/server/db/orm2');//get connections
            mockResponse = httpMocks.createResponse();
            mockRequest =  httpMocks.createRequest({
                method: 'POST'
            });
            mockRequest._parsedOriginalUrl = {
                pathname:"/account/signup"
            };
            mockRequest.body = {userName:"test",userPassword:"test",userEmail:"test@email.com"};
            done();
        });
        it("should not be created due to user being already created.",function(done){
            var mockCallbackUserExists = function(error,user){
                chai.expect(clientError[error]).to.equal(clientError[eClientError.userNameExistsError]);
                done();
            };
            accountManager.createUser(mockRequest,mockCallbackUserExists);
        });
        it("should not be created due to user email being already created.",function(done){
            mockRequest.body.userName = 'randomUserForEmail-'+Math.random();;
            var mockCallbackEmailExists = function(error,user){
                chai.expect(clientError[error]).to.have.string(clientError[eClientError.userEmailExistsError]);
                done();
            };
            accountManager.createUser(mockRequest,mockCallbackEmailExists);
        });
        var userIdToDelete  = 0;
        it("should be created.",function(done){
            mockRequest.body.userName = 'randomUserNEW-'+Math.random();
            mockRequest.body.userEmail = 'randomUserNEW-'+Math.random();
            var mockCallbackCreated = function(error,user){
                userIdToDelete = user[0].userId;
                chai.expect(user[0].userId).to.be.above(0);
                done();
            };
            accountManager.createUser(mockRequest,mockCallbackCreated);
        });
        after(function(done){
            if(userIdToDelete){
                accountManager.deleteUser(userIdToDelete,function(err,severResults){
                    chai.expect(severResults.affectedRows).to.equal(1);
                    db.close();
                    done();
                });
            } else {
                db.close();
                done();
            }
        });
    });
});