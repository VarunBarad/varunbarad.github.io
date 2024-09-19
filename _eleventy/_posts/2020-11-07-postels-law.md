---
tags:
  - post
layout: post
title: "Postel's Law"
summary: "A good yardstick to increase developer sanity"
date: 2020-11-07T00:00:00+0530
categories:
  - "programming"
---

This week I learned about a software principle that aims to make developer's lives easier. It even seems benevolent in the way that it does not necessarily help the person who tries to follow it, it rather helps the person who has to integrate with the aforementioned person's code.

The Postel's Law (more actually a guideline) was formulated by Jon Postel (an early pioneer of the Internet). It is also known as Robustness Principle.

> Be liberal in what you accept, and conservative in what you send.
>
> Jon Postel

When I thought a bit about the statement and its implications, it struck me that following this principle makes the developer's (who tries to follow this) life harder as they have to write extra code that handles all the different kinds of things that they choose to accept as input, and then have to streamline that data into tighter output. But this simplifies other peoples' work who build on top of this work.

Then the next connection I made from that was that as more and more people try to follow this principle they decrease the entropy of the overall system. Side-note: Entropy in physics roughly is the measure of disorder in a system.

### Credits and references

1. [Rahul Gonsalves](https://twitter.com/gonsalves_r) mentioned this law when trying to explain how to design user-friendly input fields.
2. [Explanation of Postel's Law on Devopedia](https://devopedia.org/postel-s-law)
3. [Robustness principle on Wikipedia](https://en.wikipedia.org/wiki/Robustness_principle)

This was an insightful learning for me, do you have any other connections that you might have made off of this. Please let me know (I really want to hear them) via [email](mailto:contact@varunbarad.com) or Twitter ([@varun_barad](https://twitter.com/varun_barad)).
