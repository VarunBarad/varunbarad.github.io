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

## Generate list of months between two dates

This will give us a list of dates for the first day of every month that falls between `earlier_date` and `later_date`. Taking the example of `earlier_date = '2022-11-16'` and `later_date = '2023-02-14'`, it will return November 2022, December 2022, January 2023 and February 2023.

```sql
select generate_series(
    cast(date_trunc('month', earlier_date) as date),
    cast(date_trunc('month', later_date) as date),
    interval '1 month'
);
```

## Count rows that satisfy a condition

|    payments    |
|:--------------:|
|  customer_id   |
|   payment_id   |
| payment_amount |
|  payment_date  |

If we want to count the number of payments where `payment_amount` is greater than 100 then we use a `filter` on the `count` aggregate:

```sql
select customer_id,
    count(payment_id) filter (where payment_amount > 100)
from payments
group by customer_id;
```

## Get first entry in each group

|    payments    |
|:--------------:|
|  customer_id   |
|   payment_id   |
| payment_amount |
|  payment_date  |

If we want to see the payment_id of the highest amount of payment for each customer_id then we need to do:

```sql
select distinct customer_id,
    first_value(payment_id) over (partition by customer_id order by payment_amount desc) as highest_payment_id
from payments
```

Note that you don't need to specify a `group by` clause for the overall query in this case.

## Map an array of ids to matching data from another table

If we have two tables, `people` and `groups`, where `people` has a column `group_ids` which is an array of ids from `groups`, we can map the array of ids to the matching name from `groups` using the following query:

```sql
select
    p.email as email,
    coalesce(groups.names, '') as group_names

from people as p
    inner join (
        select string_agg(g.name, ', ') as names, person.id as person_id

        from entity_groups as g
            inner join (
                select id, unnest(group_ids) as group_id
                from people
            ) as person on person.group_id = g.id

        group by person.id
    ) as groups on groups.person_id = p.id

order by email;
```

It is a three-step process, listed inside to out (i.e. the innermost query is executed first):

1. Convert the `group_ids` array from `people` into a table of `person_id` and `group_id` using `unnest`
2. Join the `group_id` with the `id` of `groups` to get the `name` of the group
3. Aggregate the `name` of the groups into a comma-separated string using `string_agg`

## Make a column unique after creating it

If we have a table `people` with a column `email` and we want to make it unique after we have already added it to table:

```sql
alter table people add unique (email);
```

## Make a colum non-nullable after creating it

If we have a table `people` with a column `email` and we want to make it non-nullable after we have already added it to table:

```sql
alter table people alter column email set not null;
```

Have a great day people 👋
