---
tags:
  - post
layout: post
title: "📝 undefined is not"
summary: ""
date: 
categories:
  - "javascript"
  - "til"
---

Undefined is not a keyword in JS but actually a read-only defined on the global window object. This means that while we can't actually change the value of the global window.undefined variable, we can shadow that by redefining undefined inside a closure.
