---
tags:
  - post
layout: post
title: "📝 Delay subtitles using ffmpeg"
summary: "TIL: How to delay all subtitles in a file by a fixed amount using ffmpeg"
date: 2024-06-28T11:11:33+0530
categories:
  - "til"
---

Sometimes you get subtitles which are not in sync with the video. You can use `ffmpeg` to add a fixed delay to all subtitles. Here is how you can do it:

```shell
ffmpeg -itsoffset <amount-to-delay-in-seconds> -i input.srt -c copy output.srt
```

This will create a new file `output.srt` with all subtitles delayed by the specified amount. You can use this command to delay subtitles by any amount of seconds. Negative and decimal values are also supported. For example:

```shell
# This would delay the subtitles by 2.5 seconds
ffmpeg -itsoffset 2.5 -i input.srt -c copy output.srt
```

Credits: [StackOverflow](https://stackoverflow.com/a/57821897/4717436)
