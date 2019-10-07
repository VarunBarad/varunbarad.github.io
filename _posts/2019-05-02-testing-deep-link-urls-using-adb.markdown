---
layout: post
title:  "Testing Deep-Link URLs using ADB"
summary: "Simple adb command to help you fire deep-link url in mobile from your console."
date:   2019-05-02 12:00:00 +0530
categories:
  - "android"
---

ADB is a treasure trove and I regularly keep finding some gem from it. Recently I was working on creating some new deep-link integrations for the company I work at. The below command fires an event similar to one that gets fired when we click on a link in the device itself.

The pattern for command to trigger the deep-link is as below:
```bash
adb shell am start -a android.intent.action.VIEW -d "your-link-goes-inside-these-quotes"
```

Example
```bash
adb shell am start -a android.intent.action.VIEW -d "https://varunbarad.com/blog"
```

This was just a quick ADB tip that I have learnt and wanted to share with you. If you have any more such tips or tricks, I would love to hear about them on [twitter thread for this article][twitter-thread-article]. Feel free to contact me for anything else that you would like to talk about [@varun_barad][varun-twitter].

[twitter-thread-article]: https://twitter.com/varun_barad/status/1123999186574303234
[varun-twitter]: https://twitter.com/varun_barad
