/**
 * Author: Clint Small Cain
 * Date: 4/19/2015
 * Time: 1:02 PM
 * Description:
 */
module.exports = function(itemId,creditorId,paid,confirmationCode,dueDate,amountDue){

        this.itemId = itemId;
        this.creditorId = creditorId;
        this.paid = paid?paid:'no';//todo = db is taking string this should be bool
        this.confirmationCode = confirmationCode?confirmationCode:"";
        this.dueDate = dueDate;
        this.amountDue = amountDue;
    return this;
};