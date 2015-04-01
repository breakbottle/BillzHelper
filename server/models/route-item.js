/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 4:49 PM
 * Description:
 */
module.exports = function(name,route,acceptPost,acceptGet){

    var defaultAP = acceptPost || false;
    var defaultAG = acceptGet || true;
    return {
        route:route,
        name:name,
        acceptPost:defaultAP,
        acceptGet:defaultAG
    }
};