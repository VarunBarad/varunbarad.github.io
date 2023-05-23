---
layout: post
title: "📝 Using emoji as a favicon"
summary: "TIL: How to write a simple SVG which renders an emoji as a favicon"
date: 2023-05-23 17:32:32 +0530
categories:
  - "til"
  - "programming"
---

You can use an emoji as a favicon with this simple snippet:


```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>">
```

Credits to [CSS-Tricks](https://css-tricks.com/emoji-as-a-favicon/) for this snippet.
