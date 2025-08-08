---
tags:
  - post
layout: post
title: "📝 Recursively remove .DS_Store files"
summary: "TIL: Shell command to recursively remove .DS_Store files"
date: 2023-08-09T14:49:36+0530
categories:
  - "til"
---

```shell
find . -name ".DS_Store" -type f -delete
```

If you just want to list out those files then skip the `-delete` flag.

```shell
find . -name ".DS_Store" -type f
```
