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

## Extract text subtitles from a video file to separate .srt files

This uses `ffprobe` and `jq` to extract the subtitle streams from the input file and then uses `ffmpeg` to extract the subtitle streams to separate files.

```shell
# Assuming the file is named input.mkv
ffprobe -hide_banner -loglevel quiet -select_streams s -show_entries stream=codec_name,codec_type:stream_tags=language -print_format json input.mkv | jq ".streams | to_entries | map({codec_name: .value.codec_name, language:(.value.tags.language // \"sub\"), index:.key})[] | select(.codec_name == \"subrip\") | \"\(.language)\(.index)\"" --raw-output | xargs -L1 -I % -t zsh -c 'ffmpeg -hide_banner -loglevel quiet -i input.mkv -map 0:s:$(echo % | sed "s/[^0-9]//g") %.srt'
```
