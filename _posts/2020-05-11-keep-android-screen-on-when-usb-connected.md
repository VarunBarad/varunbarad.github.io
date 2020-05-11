---
layout: post
title: "Keep Android screen on When USB is connected"
summary: "Use the command `adb shell svc power stayon usb`"
date: 2020-05-11 12:00:00 +0530
categories:
  - "android"
  - "programming"
---

To keep your Android phone screen from turning off when it is connected to your PC and you are using it to debug apps, enter the following command once in your terminal with the device connected.

```shell
adb shell svc power stayon usb
```

This sets flag inside the device using adb that whenever this device is connected via USB to not turn its screen off automatically.

Want to discuss this or any other interesting thing, hit me up on Twitter [@varun_barad](https://twitter.com/varun_barad).
