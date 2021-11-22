---
layout: post
title: "Improvement Roll"
summary: "A tiny website to suggest you useful things to do in down-time"
date: 2021-11-22 00:00:00 +0530
categories:
  - "javascript"
  - "web"
  - "programming"
---

So I finally finished a side-project after a long time and rolled it out public. You can find it [here](https://improvement-roll.varunbarad.com).

It is a tiny website which suggests you useful things you can do in your down-time instead of letting it be sucked in the maw of social media.

The idea for this came when I saw an app by the same name on the F-Droid store. The experience I wanted was a bit different from what I had with that app and also I thought that this was so trivial that it didn't need a full-fledged native app and that just a simple website should do the trick.

So I set out to building it. As with some of my other frontend related stuff, my aim was to keep this thing as less dependent on external libraries as I can (0 external dependencies sounds perfect for something of this size). Ended up not importing any external libraries/frameworks in either JS or CSS land.  

Later I thought that it would be awesome if I could access it offline too, if it has loaded itself in my browser once before. And so I looked into PWAs and implemented the simplest version I could find online to just setup a basic cache using the service-worker so that if the website has been loaded once in your browser it will load fine even if there is no internet connection.

After doing all that it occurred to me, this website might turn out to be something completely useless to people who have JS disabled in their browsers. So I started thinking as to what value I can provide to users with JS even though the whole core of this is built using conditionals and random number generators and other stuff which can't be replicated with just HTML & CSS. So then I landed on the idea to provide `<details>` and `<summary>` tags for each block of time where the whole list of that tasks for that time-block will be visible.
