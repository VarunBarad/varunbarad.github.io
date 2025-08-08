---
tags:
  - post
layout: post
title: "📝 CSS support for browser dark-mode preference"
summary: "TIL: How to support dark-mode preference of browser via CSS"
date: 2021-05-04T00:00:00+0530
categories:
  - "til"
---

There is a simple CSS media query with which we can specify styles only for dark mode or light mode.

For specifying CSS when dark mode preference is selected.
```css
@media (prefers-color-scheme: dark) {
    body {
        background: black;
        color: white;
    }
}
```

For specifying CSS when light mode preference is selected or no active preference has been expressed.
```css
@media (prefers-color-scheme: light) {
    body {
        background: white;
        color: black;
    }
}
```

Original posting: [https://twitter.com/varun_barad/status/1190613832575725571](https://twitter.com/varun_barad/status/1190613832575725571)
