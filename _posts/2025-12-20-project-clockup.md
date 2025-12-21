---
tags:
  - post
layout: post
title: "⏰️ I want a silent clock to get me to stand up"
summary: "Start of making a silent clock/alarm clock to get me to stand up every 20ish minutes while working"
date: 2025-12-20T00:58:36+0530
categories:
  - "clock-up"
  - "project"
---

I recently read about a [timer made by Hannah](https://hannahilea.com/blog/button-box-timer/) which reminds her to stand up regularly (thus being less sedentary) using a few LEDs. I wanted to build something similar as this would finally be a tiny project which I would regularly use, I definitely need to stand up more frequently. This project would also be my first electronics project in a long time, and it provides an opportunity to build my custom circuit board.

This is just an introductory post about it. So far all I have are the requirements of how I want this to function:

1. It works using a couple of AA cells, but using an 18650 Li-ion battery is also an option.
2. One toggle switch to turn the whole thing on/off
3. As soon as the device is turned on, a 20 min timer starts
4. At the end of the timer an LED turns on, and remains on until a push-button switch is pushed
5. When the push button switch is pushed, the LED turns off and the 20 min timer restarts
6. Go back to step 4
7. Turning the toggle switch (mentioned in step 2) turns the whole thing off

I originally wanted to use a single AA cell, but upon initial research it looks like that won't be voltage enough. I would need to use a boost converter, but I want to try and keep this as simple as possible.

The two options that have appeared so far are either using a micro-controller or a combination of a 555 timer IC and a latch (to keep the light turned on). I remember a childhood memory of my dad designing a circuit (for one of my school projects) where he built something like the latch that I want here using two (or maybe three) diodes, I may do that.

There are currently a few other tasks standing between me and the actual start of this project. I think I will start this sometime early next year. Hoping to take this across the finish line.

PS: The working name for the project right now is __"Clock-Up"__
