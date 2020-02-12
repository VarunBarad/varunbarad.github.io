---
layout: post
title:  "Show/Hide Layout Bounds in Android"
summary: "A couple of scripts that help to toggle display of layout-bounds on connected Android device using ADB."
date:   2019-03-08 12:00:00 +0530
redirect_from:
  - "/tools/android/2019/03/08/show-hide-android-layout-bounds.html"
categories: 
  - "tools"
  - "android"
---

Sometimes while working in Android we need to display the layout-bounds on device. Recent Android versions do provide an action-tile to do so. But on previous versions, we had to go too deep into the Settings application. I wanted to be able to perform the switch from my computer.

ADB does provide methods to do so, but the commands are not easy to remember and also get tiresome after some time.

```bash
# We need to execute both lines to
# make the layout-bounds show
adb shell setprop debug.layout true
adb shell service call activity 1599295570
```

So I made 2 files named `show-lb.sh` and `hide-lb.sh`, which respectively show and hide the layout-bounds on our testing device.

The files are as below:

`show-lb.sh`

```bash
adb shell setprop debug.layout true > /dev/null 2>&1
adb shell service call activity 1599295570 > /dev/null 2>&1
```

`hide-lb.sh`

```bash
adb sehll setprop debug.layout false > /dev/null 2>&1
adb shell service call activity 1599295570 > /dev/null 2>&1
```

That `> /dev/null 2>&1` part at the end of each line is just so that the output of that particular command does not get displayed in our terminal as we don't need it.

`Note for Windows users:` You friends need to omit the `> /dev/null 2>&1` and save these files as `show-lb.bat` and `hide-lb.bat` 

You can save these files (make sure to give them `executable` permission if you are on a unix-based machine) and then add their location to system's `PATH` variable. That way you can execute these from anywhere.

I do think that I would indeed make a version of this in the future where it check the current state and automatically toggle it.

## That's all folks

This was my solution to improve my daily work experience by 1%. If you have more such ideas/examples or any other suggestions  under the sky, [contact me][varun-contact] or tweet to me [@varun_barad][varun-twitter].

[varun-contact]: https://varunbarad.com/contact
[varun-twitter]: https://twitter.com/varun_barad
