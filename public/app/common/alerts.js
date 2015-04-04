/**
 * Author: Clint Small Cain
 * Date: 3/23/2015
 * Time: 8:59 AM
 * Description:
 */
application.value('bilToastr',toastr)
.factory('bilAlerts',function(bilToastr,bilDebug){
    return {
        notify:function(msg){
            bilToastr.success(msg);
            bilDebug('bilAlerts','success',msg);
        },
        error:function(msg){
            bilToastr.error(msg);
            bilDebug('bilAlerts','error',msg);
        }
    }
});