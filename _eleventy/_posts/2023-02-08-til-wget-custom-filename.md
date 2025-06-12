---
tags:
  - post
layout: new_post
title: "📝 wget with custom filename"
summary: "TIL: How to download a file with wget to a custom filename"
date: 2023-02-08T14:59:48+0530
categories:
  - "til"
---

```shell
wget --output-document "<filename-goes-here>" --continue "<file-url-goes-here>"
```
