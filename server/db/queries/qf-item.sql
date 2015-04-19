SELECT

  bm.id itemID,
  bc.creditor,
  bm.amt_due,
  bm.due_date,
  bc.min_payments,
  bc.balance,
  bc.contact,
  bc.id creditorID,
  bc.website
FROM billmgr bm
inner join bill_creditors bc on bc.id=bm.creditor
where
  bm.id='[itemId]'