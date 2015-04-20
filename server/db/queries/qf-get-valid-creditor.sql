SELECT min_payments,id,`interval`,`intervalType`,`StartDate`,`EndDate`,`billtype`,
  (select max(due_date) from billmgr where creditor=bc.id) dueDate

FROM bill_creditors bc
where active  = 1
      and ((id not in (select creditor from billmgr where paid='no' and due_date > now())
            and id in (select creditor from billmgr where paid='no' and due_date < now()))
           or id not in (select creditor from billmgr )
           or (select count(*) from billmgr where paid='no' and creditor=bc.id) =0
)
      and `interval` > 0
      and min_payments > 0
      and billtype=1