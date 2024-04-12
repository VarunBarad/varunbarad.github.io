---
layout: post
title: "📝 Outputting text with echo without a newline"
summary: "TIL: How to output text with echo without a newline at the end of it"
date: 2024-04-06 15:14:19 +0530
categories:
  - "til"
---

Recently I wanted to output a string containing the day's date and time. So I used the `echo` command combined with the `date` command. But I didn't want the newline at the end of the output. So I asked ChatGPT and here's the command I got:

```shell
echo -n "Hello Varun"
```
