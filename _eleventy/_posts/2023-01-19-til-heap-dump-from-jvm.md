---
tags:
  - post
layout: post
title: "📝 Taking a heap-dump from a running JVM process"
summary: "TIL: How to take heap-dump from a running JVM process"
date: 2023-01-19T13:00:00+0530
categories:
  - "til"
---

I was trying to find the root-cause of a memory leak and amongst many different rabbit holes, I learnt how to take the heap-dump from an application running on JVM.

The tool used is called `jmap` and the exact command to dump the output to a file called `heap-dump.bin` is:

```shell
jmap -dump:all,format=b,file=heap-dump.bin <process-id-of-the-jvm-process>
```
