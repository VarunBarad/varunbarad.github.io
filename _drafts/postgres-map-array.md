---
layout: post
title: "📝 Map an array of ids in postgres to matching data from another table"
summary: "TIL: How to map an array in postgres to other data"
date: 2023-04-11 08:10:27 +0530
categories:
  - "til"
---

select
    p.full_name as name,
    p.email as email,
    case when p.is_admin then 'Yes' else 'No' end as admin,
    coalesce(to_char(p.credit_leaves_from, 'DD-MM-YYYY'), '') as leaves_credited_from,
    case when p.archived_at is null then 'No' else 'Yes' end as archived,
    coalesce(to_char(p.leaving_date, 'DD-MM-YYYY'), '') as exit_date,
    coalesce(to_char(p.birth_date, 'DD-MM-YYYY'), '') as date_of_birth,
    coalesce(to_char(p.work_anniversary, 'DD MON'), '') as work_anniversary_date,
    approver.full_name as approver_name,
    approver.email as approver_email,
    coalesce(groups.names, '') as team_names

from people p
    inner join people approver on p.approver_id = approver.id
    inner join (
        select string_agg(g.name, ', ') as names, person.id as person_id

        from entity_groups g
            inner join (
                select id, unnest(group_ids) as group_id
                from people
            ) person on person.group_id = g.id

        group by person.id
    ) groups on groups.person_id = p.id

where p.org_id = '2f75b86d-405a-4d96-be27-05797c2eb6c5'

order by name;
