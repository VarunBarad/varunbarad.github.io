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
select exists(select 1 from your_table where your_condition)
```

## Use single-quote inside a string

Put two single-quotes (') wherever you want to use a single-quote inside the string

```sql
select * from people where full_name = 'Travis O''Connor'
```

## Convert timestamptz to a timestamp in a particular timezone

Assuming `created_at` is a column in table `people` with type `timstamptz` and we want to see what those timestamps are in IST (Asia/Kolkata or Asia/Calcutta)

```sql
select created_at at time zone 'Asia/Kolkata' as shifted from people
```

Have a great day people 👋
