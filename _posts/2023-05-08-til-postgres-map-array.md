---
tags:
  - post
layout: post
title: "📝 Map an array of ids in postgres to matching data from another table"
summary: "TIL: How to map an array in postgres to other data"
date: 2023-05-08T23:10:27+0530
categories:
  - "til"
---

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
