---
layout: post
title: "Cheatsheet - YouTube-DL"
summary: "A cheat-sheet for YouTube-DL CLI"
date: 2021-10-07 00:00:00 +0530
categories:
  - "cheat-sheet"
---

## Use a separate file to record already downloaded URLs

```shell
youtube-dl --download-archive archive.txt "https://www.youtube.com/watch?v=toVfvRhWbj8"
```

## Read URLs from a file (one URL per line)

```shell
youtube-dl -a links.txt
```

## Extract audio from a video (and convert it to mp3)

```shell
youtube-dl --format 'bestaudio/best' --audio-format 'mp3' "https://www.youtube.com/watch?v=jVfDUvjvUSM"
```

## Download a video and convert it to mp4

```shell
youtube-dl --format 'bestvideo+bestaudio/best' --recode-video 'mp4' "https://www.youtube.com/watch?v=Jv8KRwF1zQs"
```

Have fun and be responsible 🤺
