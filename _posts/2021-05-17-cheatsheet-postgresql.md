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

Have a great day people 👋
