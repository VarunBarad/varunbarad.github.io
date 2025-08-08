---
tags:
  - post
layout: post
title: "Windows Symlink"
summary: "How to create a Linux-like symlink on Windows"
date: 2021-07-24T00:00:00+0530
categories:
  - "tools"
---

**Context:** Any file appearing to be stored in `SourceDirectory` are actually stored in `DestinationDirectory`.

To create a link from `SourceDirectory` to `DestinationDirectory`

```batch
mklink /3 "<full-path-to-SourceDirectory>" "<full-path-to-DestinationDirectory>"
```

Have a great day people 👋
