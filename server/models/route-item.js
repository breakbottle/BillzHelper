/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 4:49 PM
 * Description:
 */
module.exports = function(name,route,viewModel,acceptPost){

    var defaultVM = viewModel || {};
    var defaultAP = acceptPost || false;
    return {
        route:route,
        name:name,
        viewModel:defaultVM,//page variables
        acceptPost:defaultAP
    }
};