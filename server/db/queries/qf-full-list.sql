
Select * from (
                SELECT

                  bm.id itemID,
                  bc.creditor,
                  bm.amt_due,
                  DATE_FORMAT(bm.due_date,'%b %d %Y %h:%i %p') due_date,
                  bc.auto,
                  bc.id creditorId,
                  0 rowType
                FROM billmgr bm
                  inner join bill_creditors bc on bc.id=bm.creditor
                where
                  ((DATE_ADD( now( ) , INTERVAL 30 DAY ) and bm.paid = 'no') or bm.paid = 'no'
                  )and active=1
                Union all
                Select 'CURRENT PERIOD','',null,(select DATE_FORMAT(StartDate,'%b %d %Y %h:%i %p') StartDate from bill_creditors where id=1),false,0,1
                Union all
                Select 'TOTAL','Total',(select sum(amt_due) FROM billmgr bm
                  inner join bill_creditors bc on bc.id=bm.creditor
                where
                  ((DATE_ADD( now( ) , INTERVAL 30 DAY ) and bm.paid = 'no') or bm.paid = 'no'
                  )and active=1),
                  DATE_FORMAT(DATE_ADD( (select StartDate from bill_creditors where id=1) , INTERVAL 29 DAY ),'%b %d %Y %h:%i %p'),false,0,1
                Union all
                Select
                  'TOTAL',
                  'DUE NOW!!',
                  (select
                                                sum(amt_due)
                   from billmgr bm
                     inner join bill_creditors bc on bc.id=bm.creditor and bc.active=1
                   where
                     paid='no' and
                     due_date <= DATE_ADD( (select StartDate from bill_creditors where id=1) , INTERVAL 14 DAY )),
                  DATE_FORMAT(DATE_ADD( (select StartDate from bill_creditors where id=1) , INTERVAL 14 DAY ),'%b %d %Y %h:%i %p'),false,0,1
                Union all
                Select
                  'TOTAL',
                  'DUE NEXT?',
                  (select
                                                sum(amt_due)
                   from billmgr bm
                     inner join bill_creditors bc on bc.id=bm.creditor and bc.active=1
                   where
                     paid='no' and
                     due_date > DATE_ADD( (select StartDate from bill_creditors where id=1) , INTERVAL 14 DAY )
                     and
                     due_date <= DATE_ADD( (select StartDate from bill_creditors where id=1) , INTERVAL 28 DAY )),
                  DATE_FORMAT(DATE_ADD( (select StartDate from bill_creditors where id=1) , INTERVAL 28 DAY ),'%b %d %Y %h:%i %p'),false,0,1
              ) fullListandCalac
order by due_date