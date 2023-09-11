---
layout: post
title: "📝 PostgreSQL: Mark a column non-nullable after creating it"
summary: "TIL: How to add a not null constraint to an existing column in a PostgreSQL table"
date: 2023-08-20 14:23:22 +0530
categories:
  - "til"
---

If we have a table `people` with a column `email` and we want to make it non-nullable after we have already added it to table:

```sql
alter table people alter column email set not null;
```
