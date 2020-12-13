---
layout: post
title: "Java convert LocalDateTime to Instant using ZoneId"
summary: "How to convert from LocalDateTime to Instant using ZoneId without ZoneOffset in Java 8 Time APIs"
date: 2020-12-14 00:00:00 +0530
categories:
  - "programming"
---

Last week I was working on something which required me to convert `LocalDateTime` to `Instant`. The direct conversion APIs that are available needed an instance of `ZoneOffset` to perform the conversion. Catch was that I had `ZoneId` and not `ZoneOffset` there was a tiny round-about way to do so.

- Convert `LocalDateTime` to `ZonedDateTime` using `ZoneId` : `ZonedDateTime.of(localDateTime, zoneId)`
- Convert `ZonedDateTime` to `Instant` : `zonedDateTime.toInstant()`
  
I don't know why there isn't a native API to convert from `LocalDateTime` to `Instant` directly using a `ZoneId`. If you do then I would like to know either via [email](mailto:contact@varunbarad.com) or Twitter ([@varun_barad](https://twitter.com/varun_barad)).
