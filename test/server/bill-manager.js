/**
 * Author: Clint Small Cain
 * Date: 4/19/2015
 * Time: 9:08 AM
 * Description:
 */
var chai = require('chai');
var httpMocks = require('node-mocks-http');


describe('bill-manager',function(){
    var bill,db,billItem;
    var __cwd = process.cwd();
    before(function(done){
        bill = require(__cwd+'/server/includes/bill-manager');
        billItem = require(__cwd+'/server/models/bill-item');
        db = require(__cwd+'/server/db/orm2').connect;//get connections
        done();
    });

    describe('processAutoBills',function(){
        it('should process auto bill',function(){
            bill.processAutoBills().then(function(r){
                console.log("We process sync----------------->",r);
            }).fail(function(f){
                console.log("We process FAIL----------------->",f);
            });
        })
    });

    describe('managePayPeriod',function(){
        it('should process pay period',function(){
            bill.managePayPeriod().then(function(a){
                describe('managePayPeriod query PASS',function(){
                    it('should be true',function(){
                        chai.expect(a).to.be.true;
                    })
                });
            }).fail(function(e){
                describe('managePayPeriod query fail',function(){
                    it('should be null',function(){
                        chai.expect(e).to.be.a('null');
                    })
                });
            });
        })
    });

    describe('addBill',function(){
        it('should add a bill',function(){
            bill.addBill(new billItem(0,44,"no","",new Date(),50),{frequency:1,type:'Day'}).then(function(a){
                describe('addBill query results',function(){
                    it(' should be insertId',function(){
                        chai.expect(a.insertId).to.be.above(0);
                    })
                });
                bill.deleteBill(a.insertId).then(
                    function(item){
                        describe('deleteBill',function(){
                            it('should delete id',function(){
                                chai.expect(item.affectedRows).to.be.equal(1);
                            })
                        });
                    }
                );
            }).fail(function(e){
                describe('addBill query fail',function(){
                    it('should be null',function(){
                        chai.expect(e).to.be.a('null');
                    })
                });
            });
        })
    });

    describe('getCreditorsToAutoProcess',function(){
        it('should process auto bills for creditors',function(){

            bill.getCreditorsToAutoProcess().then(function(a){
                describe('addBill',function(){
                    it('should add a bill',function(){
                        chai.expect(a).to.be.instanceof(Array);
                    })
                });
            }).fail(function(e){
                describe('addBill',function(){
                    it('should add a bill',function(){
                        chai.expect(e).to.be.a('null');
                    })
                });
            });

        })
    });
    after(function(){

    });
});