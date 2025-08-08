---
tags:
  - post
layout: post
title: "Cheatsheet - YouTube-DL"
summary: "A cheat-sheet for YouTube-DL CLI"
date: 2021-10-07T00:00:00+0530
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

## Write description to a file

```shell
youtube-dl --write-description "https://www.youtube.com/watch?v=xxX81WmXjPg"
```

## Embed subtitles

```shell
youtube-dl --all-subs --embed-subs "https://www.youtube.com/watch?v=xxX81WmXjPg"
```

## Write thumbnail

```shell
youtube-dl --write-thumbnail "https://www.youtube.com/watch?v=xxX81WmXjPg"
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
