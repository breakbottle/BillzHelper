/**
 * Author: Clint Small Cain
 * Date: 4/4/2015
 * Time: 11:49 AM
 * Description:
 */
module.exports = function(action,acceptPost,acceptGet){

    var defaultAP = acceptPost || false;
    var defaultAG = (!acceptGet)?true:acceptGet;

    return {
        action:action,
        postAction:null,
        //put//delete
        acceptPost:defaultAP,
        acceptGet:defaultAG,

        post:function(post){
            this.postAction = post;
            return this;
        }

    }
};