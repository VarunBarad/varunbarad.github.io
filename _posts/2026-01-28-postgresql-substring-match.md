---
tags:
  - post
layout: post
title: "🐘 Matching a sub-string in PostgreSQL"
summary: "Throwing runtime exception/error from native functions in Lox"
date: 2026-01-28T10:08:37+0530
categories:
  - "postgresql"
---

This is embarrassing how many times I have had to look this up. Writing it down this time, so atleast I know for sure where I can find the info.

Let's say you have a table named `people_info` with one of the columns called `email`:

| email                    |
|:-------------------------|
| varun@work.com           |
| cdain3@qq.com            |
| varunsomeone@gmail.com   |
| poseidon@yahoo.co.in     |
| special_varun@yahoo.com  |
| areswashere@aol.com      |
| varun+unique@example.com |
| trash@varunbarad.com     |

Now we only want rows where `email` contains the sub-string `varun`.

```sql
select email
from people_info
where email like '%varun%';
```

This now gives us:

| email                    |
|:-------------------------|
| varun@work.com           |
| varunsomeone@gmail.com   |
| special_varun@yahoo.com  |
| varun+unique@example.com |
| trash@varunbarad.com     |
