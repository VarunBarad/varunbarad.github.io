---
tags:
  - post
layout: post
title: "Cheatsheet - ImageMagick"
summary: "A cheat-sheet for ImageMagick"
date: 2021-10-17T00:00:00+0530
categories:
  - "cheat-sheet"
  - "imagemagick"
---

## Resize images to specific target size while padding remaining space with transparency

```shell
convert -auto-orient -background "#00000000" original.jpg -resize 720x576 -gravity center -extent 720x576 resized.png
```

## Resize all images of a file-type inside a folder

```shell
for PHOTO in *.jpg
do
    convert -auto-orient -background "#00000000" "$PHOTO" -resize 720x576 -gravity center -extent 720x576 "resized/$PHOTO.png"
done
```

## Replace a color in image with different color

```shell
convert input.png -fuzz 90% -fill "#628FDB" -opaque "#000000" star_blue.png
```

- `fuzz`: Percentage matching of the color
- `opaque`: Color to replace
- `fill`: Color to replace with

## Reverse the RGB colors in an image

```shell
convert input.png -channel RGB -negate output.png
```

## Resize image and then crop center to fit target size

```shell
convert original.jpg -resize 720x576^ -gravity center -crop 720x576+0+0 +repage resized.png
```

## Scale (not resize) an image

```shell
magick original.webp -scale 128x128 scaled.webp
```

Automation is exciting 🤖
