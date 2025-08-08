---
tags:
  - post
layout: post
title: "📝 List files updated in a git commit"
summary: "TIL: How to see a list of files updated in a git commit"
date: 2021-11-17T00:00:00+0530
categories:
  - "til"
---

I wanted to see the list of files committed in my last commit

```shell
git show --pretty="" --name-only <sha1-commit-hash>
```
