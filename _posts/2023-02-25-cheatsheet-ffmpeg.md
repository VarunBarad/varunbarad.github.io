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

## Embed thumbnail into an mp4 video file

Here we want to apply thumbnail from `image.png` to `input.mp4` and save the result to `output.mp4`.

```shell
ffmpeg -i input.mp4 -i image.png -map 1 -map 0 -c copy -disposition:0 attached_pic output.mp4
# Note: attached_pic here is a keyword to the disposition option
```

Credits: [StackOverflow](https://stackoverflow.com/a/54719926/4717436)

## Remove chapters from a video file

Here we want to remove embedded chapter markings from `input.mp4` and save the result to `output.mp4`.

```shell
ffmpeg -i input.mp4 -map_chapters -1 -c copy output.mp4
```

## Delay subtitles

```shell
ffmpeg -itsoffset <amount-to-delay-in-seconds> -i input.srt -c copy output.srt
```

This will create a new file `output.srt` with all subtitles delayed by the specified amount. You can use this command to delay subtitles by any amount of seconds. Negative and decimal values are also supported. For example:

```shell
# This would delay the subtitles by 2.5 seconds
ffmpeg -itsoffset 2.5 -i input.srt -c copy output.srt
```
