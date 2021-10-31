---
layout: post
title: "📝 Centering elements with CSS"
summary: "TIL: How to center (horizontally and vertically) elements with CSS."
date: 2021-10-31 00:00:00 +0530
categories:
  - "til"
---

We can use flexbox to do this. `#parent` is the container element inside which to center the `#child` element.

```css
#parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
