---
tags:
  - post
layout: post
title: "📝 Link to a specific piece of text on a webpage"
summary: "TIL: How to link to a specific "
date: 2025-08-02T16:18:43+0530
categories:
  - "til"
  - "blaugust-2025"
---

Let's say you needed to link to the "Rainbow Badge" section on [this page](https://nerdgirlthoughts.game.blog/2025/07/10/blaugust-2025-is-coming/), it is not an element with an `id` set so that you can directly append a `<page-url>#element_id` and call it a day.

Recently browsers have also started supporting linking directly to any text of your choice on any given page. That concept is called "Text Fragments" ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments)).

The basic structure of your URL needs to be like below:

```text
{{ "<your-page-url>#:~:text=<your-target-text-url-encoded>" | escape }}
```

So for my above example I would have to use a link that looks something like this:

```text
https://nerdgirlthoughts.game.blog/2025/07/10/blaugust-2025-is-coming/#:~:text=Rainbow%20Diamond%20Award
```
