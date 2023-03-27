---
layout: post
title: "📝 Find the first entry in each group"
summary: "TIL: How to get the first entry from each group given a sort order"
date: 2023-03-27 17:39:15 +0530
categories:
  - "til"
---

|    payments    |
|:--------------:|
|  customer_id   |
|   payment_id   |
| payment_amount |
|  payment_date  |

If we want to see the highest amount of payment for each customer_id then we need to do:

```sql
select distinct customer_id,
    first_value(payment_amount) over (partition by customer_id order by payment_amount desc) as highest_payment_amount
from payments
```

Note that you don't need to specify a `group by` clause for the overall query in this case.
