---
layout: post
title: "📝 How to make non-capturing groups in RegEx"
summary: "TIL: What are non-capturing groups and how we can use them"
date: 2022-08-30 07:44:04 +0530
categories:
  - "til"
---

__TLDR:__ This is how you surround a regular (capturing) group in regex `()`. And this is how you surround a non-capturing group in regex `(?:)`.

I had to write a regex to extract an ID from a URL. The URL could come in either of the below form

```
https://www.randomwebsite.com/file_64fe4cd
or
https://randomwebsite.com/file_64fe4cd
```

And I had to extract out only the `file_64fe4cd` part from it.

I started with this regex:

```regexp
^https://(www\.)?randomwebsite.com/(file_\w+)$
```

The problem this was giving me was it was providing two captured groups. One for the `(www\.)?` and the other one for `(file_\w+)` (the one I wanted).

I wanted to treat the first group as a group (for whether it could be present) but not have it captured. That's how I got to know about non-capturing groups in regex. This is how you write a non-capturing group:

```regexp
(?:<rest-of-your-group-match-here>)
```

So our regex now becomes

```regexp
^https://(?:www\.)?randomwebsite.com/(file_\w+)$
```
