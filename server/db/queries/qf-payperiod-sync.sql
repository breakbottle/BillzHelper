#todo: this query needs to be updated, this is just wrong..should update by period

update bill_creditors set StartDate=DATE_ADD( StartDate , INTERVAL 1 DAY ) Where id=1
                                                                                 and
                                                                                 if(now() >= DATE_ADD( StartDate , INTERVAL 14 DAY ),1,2)=1