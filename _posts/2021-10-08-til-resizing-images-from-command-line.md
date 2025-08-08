---
tags:
  - post
layout: post
title: "📝 Resizing images from command-line"
summary: "TIL: Resizing images from command-line while centering them and adding a transparent background."
date: 2021-10-08T00:00:00+0530
categories:
  - "til"
---

I had to resize a bunch of images today to a specific target size while padding the remaining space with a transparent background. Out came ImageMagick

```shell
convert -auto-orient -background "#00000000" original.jpg -resize 720x576 -gravity center -extent 720x576 resized.png
```

The above command would make an output image of 720 x 576 and the remaining space will be padded by transparency (#00000000).

To do it for all files inside a folder we can use this (here we are only targeting all files ending in `.jpg`)

```shell
for PHOTO in *.jpg
do
    convert -auto-orient -background "#00000000" "$PHOTO" -resize 720x576 -gravity center -extent 720x576 "resized/$PHOTO.png"
done
```
