SELECT
bm.id itemID,bc.creditor,bc.id creditorID,bc.balance,bc.min_payments,auto,`StartDate`
FROM billmgr bm
inner join bill_creditors bc on bc.id=bm.creditor
where
  bc.auto = 1 and
  bm.due_date < now() and
  bm.paid='no' and
  bc.active  = 1 and
  `interval` > 0 and
  bc.min_payments > 0 and
  bc.billtype=1