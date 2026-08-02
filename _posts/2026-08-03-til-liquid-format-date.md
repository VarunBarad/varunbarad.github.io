---
tags:
  - post
layout: post
title: "📝 Format a date in Liquid"
summary: "You can use the \"date\" filter in Liquid templates to format your dates and timestamps"
date: 2026-08-03T00:58:00+0530
categories:
  - "blaugust-2026"
  - "programming"
  - "til"
---

We use the `date` filter in Liquid to format dates and/or timestamps. You can find more details in the [official docs](https://liquidjs.com/filters/date.html). I wanted the date in the format "August 02, 2026" so I used this format string:

{% raw %}
```liquid
{{ entry.date | date: '%B %d, %Y', 'Asia/Kolkata' }}
```
{% endraw %}

The `date` filter defaults to the timezone that the host machine is running on. It does not automatically follow the timezone offset mentioned in the incoming timestamp. So we need to specify the particular timezone in which the formatted date/timestamp needs to be computed.
