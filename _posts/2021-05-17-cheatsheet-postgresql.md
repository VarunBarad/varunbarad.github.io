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

## Format timestamp/date

Assuming `birthdate` is a column in table `people` with type `date` and we want to display those values in `10 Oct 2021` format

```sql
select to_char(birthdate, 'DD Mon YYYY') from people
```

Refer to [official docs](https://www.postgresql.org/docs/current/functions-formatting.html) for more and/or latest details

## Auto-populate values for created_at and updated_at columns

We first need to create a function which would update the value of `updated_at` column every time data in a row changes

```sql
create or replace function update_modified_timestamp() returns trigger
language plpgsql as
$$
BEGIN
    new.updated_at := current_timestamp;
    return new;
END;
$$;
```

Then we need to provide default values to columns when defining table schema

```sql
create table people (
    id integer primary key,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    name text not null
);
```

At last we need to add a trigger to each table where we want to auto-update the value of `updated_at`

```sql
create trigger update_timestamp before update on people
for each row execute procedure update_modified_timestamp();
```

Have a great day people 👋