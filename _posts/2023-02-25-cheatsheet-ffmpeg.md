---
layout: post
title: "Cheatsheet - ffmpeg"
summary: "A cheat-sheet for ffmpeg"
date: 2023-02-25 10:36:10 +0530
categories:
  - "cheat-sheet"
---

## Extract audio from .webm to .mp3

```shell
FILE="the-file-you-want-to-process.webm"
ffmpeg -i "${FILE}" -vn -ab 128k -ar 44100 -y "${FILE%.webm}.mp3"
```

Credits: [Bytefreaks.net](https://bytefreaks.net/gnulinux/bash/ffmpeg-extract-audio-from-webm-to-mp3)
