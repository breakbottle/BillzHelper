/**
 * Author: Clint Small Cain
 * Date: 3/25/2015
 * Time: 10:32 PM
 * Description:
 */
describe('Account',function(){
   beforeEach(module('app'));
    /* //good to know
    promise.$$state.status === 0 // pending
    promise.$$state.status === 1 // resolved
    promise.$$state.status === 2 // rejected
    */
    var $rootScope, $httpBackend, bilAuth,bilIdentity;
    var flushAndDigest = function(){
        $rootScope.$digest();
        $httpBackend.flush();
    };

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _bilAuth_,_bilIdentity_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        bilAuth = _bilAuth_;
        bilIdentity = _bilIdentity_;

    }));

    it('authenticated user should be valid', function(){
        $httpBackend.when('POST','/account/login')//.passThrough();
            .respond({
                success:true,
                user:{Name:"clint"}
            });

        var valid,user;
        bilAuth.authenticatedUser("blah","blah").then(function(result){
            user = bilIdentity.currentUser; //console.log("what",user)
            valid = result;
        });

        flushAndDigest();
        expect(valid).to.be.true;
        expect(user.Name).to.equal("clint");
    });
    it('authenticated user should not be valid', function(){
        $httpBackend.whenPOST('/account/login')
            .respond({
                success:false,
                user:"clint"
            });
        var valid;
        bilAuth.authenticatedUser("blah","blah").then(function(result){
            valid = result;
        });

        flushAndDigest();
        expect(valid).to.be.false;
    });
    it('logout user should not have errors', function(){
        $httpBackend.whenPOST('/account/logout')
            .respond({
                success:false
            });
        var valid,user;
        bilAuth.logoutUser().then(function(result){
            user = bilIdentity.currentUser;
            valid = result;
        });

        flushAndDigest();
        expect(valid).to.be.falsy;
        expect(user).to.be.a('undefined');
    });
    it('signed up user should create successfully', function(){
        $httpBackend.whenPOST('/account/signup')
            .respond({
                success:true,
                user:"clint"
            });
        var valid,user;
        bilAuth.signUpUser("blah","blah").then(function(result){
            user = bilIdentity.currentUser;
            valid = result;
        });

        flushAndDigest();
        expect(valid).to.be.true;
        expect(user).to.equal("clint");
    });

    afterEach(function(){


    });
});

