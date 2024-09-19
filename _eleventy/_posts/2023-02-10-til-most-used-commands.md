---
tags:
  - post
layout: post
title: "📝 Most used commands"
summary: "TIL: How to view your most used terminal commands on a Mac"
date: 2023-02-10T11:04:06+0530
categories:
  - "til"
---

Use this command to view the top-5 most used commands on your Mac terminal

```shell
history | awk 'BEGIN {FS="[ \t]+|\\|"} {print $5}' | sort | uniq --count | sort --reverse --sort=numeric | head --lines 5
```
