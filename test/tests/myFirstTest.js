/**
 * Author: Clint Small Cain
 * Date: 3/25/2015
 * Time: 10:32 PM
 * Description:
 */
describe('myFirstTest',function(){
   beforeEach(module('app'));

    describe('clint',function(){
        it('should return whatever',inject(function(myFirstTest){
            console.log("what",myFirstTest);
            expect(myFirstTest.clint == "small").to.be.true;
        }));
    });
});