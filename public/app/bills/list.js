/**
 * Author: Clint Small Cain
 * Date: 4/12/2015
 * Time: 3:36 PM
 * Description:
 */
application.controller('bilListCtrl',function($scope,$sce,RequireJs,$http,bilIdentity,bilLocation,$filter){
    if(bilLocation.noAuth()) return; //option to redirect, or todo: param to call directive logout splash page
    bilLocation.setLocation("/list/");
    $scope.bills = [];
    $scope.isLoading = true;
    $http.post('/bills/list',{}).then(function(response){
        if(response.data){
            $scope.bills = response.data.bills;
        }

        $scope.isLoading = false;

    },function(response){
        console.log("This is an error",Error("ohhh no!!!"));
        $scope.isLoading = false;
    });
    $scope.currentItemList = [];//used ot cache date request
    $scope.currentItem = {
        itemId:0,
        itemValues:{}
    };
    $scope.trustAsHtml = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };
    /*$scope.gridOptions = {//todo: user for reporting
        data:'bills',
        showGroupPanel: true,
        columnDefs:[
            {field:'creditor',displayName:"Creditor"},
            {field:'amt_due',displayName:"Amount Due"},
            {field:'due_date',displayName:"Due Date"}
        ]


    };*/
    $scope.billAlert = function(date){
        return new Date(date) < new Date();
    };
    $scope.showItem = function(){

        this.bill.active = !this.bill.active;//This is to toggle show /hide item.

        if(!$scope.currentItemList[this.bill.itemID]){
            $http.post('/bills/list/'+this.bill.itemID,{item:true}).then(function(response){
                if(response.data){//todo: put $cacheFactory here instead so we can re-use through out the application.
                    $scope.currentItem = {
                        itemId:response.data.billsInformation[0].itemID,
                        itemValues:response.data.billsInformation[0]
                    };
                    $scope.currentItemList[response.data.billsInformation[0].itemID] = $scope.currentItem;

                }
            });
        } else {
            $scope.currentItem =  $scope.currentItemList[this.bill.itemID];
        }
        /*
        if(this.bill.active){//messing up my css3 transitions
            bilLocation.setLocation("/list/"+this.bill.itemID);
        } else{
            bilLocation.setLocation("/list/");
        }*/

    };
    $scope.processPay = function(){
        this.bill.processing = !this.bill.processing;//This is to toggle show /hide item.
    };
    $scope.confirm = function(){
        var data = {
            amountPaid:this.confirmBill.amountPaid.$viewValue,
            confirmation:this.confirmBill.confirmation.$viewValue,
            adjustBalance:this.confirmBill.adjustBalance.$viewValue,
            creditorId:this.bill.creditorId
        };
        var controllerScope = this;
        RequireJs(['bilAlerts']).then(function(resolver){
            $http.post('/bills/list/'+controllerScope.bill.itemID,data).then(function(response){
                if(response.data){
                    if(response.data.success){
                        resolver.bilAlerts.notify("Bill has been processed successfully!");
                        $scope.processPay.call(controllerScope);//show ..show item
                        $scope.showItem.call(controllerScope);//hide item
                        controllerScope.bills.splice(controllerScope.bills.indexOf(controllerScope.bill),1);//todo:set timeout to get fresh list,kill timeout if new bill has been processed in set amount of time, then set a new timer
                    } else {
                        resolver.bilAlerts.error("Error: Bill was not processed!");
                    }
                } else {
                    resolver.bilAlerts.error("something went wrong!!");
                }
            },function(){
                resolver.bilAlerts.error("Failed: something went wrong!!");
            });
        });
    };
}).directive('billItem',function(){

    return {
        restrict:'AEC',
        replace:true,
        templateUrl:'/partials/bills/bill-item'

    }
}).directive('billConfirm',function(){

    return {
        restrict:'AEC',
        replace:true,
        templateUrl:'/partials/bills/bill-confirm'

    }
});