---
tags:
  - post
layout: post
title: "📝 Counting days between 2 dates in PostgreSQL"
summary: "TIL: You can use the extract function to find difference in days between 2 dates"
date: 2023-04-09T07:52:44+0530
categories:
  - "til"
---

|    payments    |
|:--------------:|
|  customer_id   |
|   payment_id   |
| payment_amount |
|  payment_date  |

If you want to count the number of days between each payment and today then you can use `extract` function with `days` as a parameter:

```sql
select payment_id,
    payment_date,
    extract(days from now() - payment_date) as days_since_payment
from payments
```
