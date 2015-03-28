/**
 * Author: Clint Small Cain
 * Date: 3/23/2015
 * Time: 8:59 AM
 * Description:
 */
application.value('bilToastr',toastr)
.factory('bilAlerts',function(bilToastr){
    return {
        notify:function(msg){
            bilToastr.success(msg);
            console.log(msg);
        }
    }
});