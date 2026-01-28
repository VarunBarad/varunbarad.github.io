---
tags:
  - post
layout: post
title: "📝 PostgreSQL: Make a column unique after creating it"
summary: "TIL: How to add unique constraint to an existing column in a PostgreSQL table"
date: 2023-08-19T14:23:22+0530
categories:
  - "til"
  - "postgresql"
---

If we have a table `people` with a column `email` and we want to make it unique after we have already added it to table:

```sql
alter table people add unique (email);
```
