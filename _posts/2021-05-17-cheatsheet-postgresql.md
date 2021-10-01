---
layout: post
title: "Cheatsheet - PostgreSQL"
summary: "A cheat-sheet for PostgreSQL database"
date: 2021-05-17 00:00:00 +0530
categories:
  - "cheat-sheet"
---

## Dump database to a script (.sql) file

Extract/Dump the database contents to a script (.sql) file

```shell
pg_dump -f ~/path/to/file.sql $YOUR_DATABASE_URL
```

## Run a script (.sql) from file on a database

Run SQL commands from a file on a database

```shell
psql $YOUR_DATABASE_URL -f ~/path/to/file.sql
```

## Check whether there is any row in the table matching your condition

```sql
select exists(select 1 from your_table where your_condition);
```

## Use single-quote inside a string

Put two single-quotes (') wherever you want to use a single-quote inside the string

```sql
select * from people where full_name = 'Travis O''Connor'
```

Have a great day people 👋
