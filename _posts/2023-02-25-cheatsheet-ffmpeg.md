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

## Merge subtitle (srt) files with video files
```shell
ffmpeg -i video.mp4 -i subtitle.srt -c:s mov_text -c:v copy -c:a copy merged.mp4
```
Credits: [StackExchange](https://superuser.com/a/520555)

## Convert .mkv to .mp4
```shell
ffmpeg -i input.mkv -c:v copy -c:a copy output.mp4
```
