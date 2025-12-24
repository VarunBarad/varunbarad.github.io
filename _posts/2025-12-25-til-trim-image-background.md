---
tags:
  - post
layout: post
title: "📝 Trim image to content using ImageMagick"
summary: "You can use ImageMagick to crop an image to just its central content"
date: 2025-12-25T07:30:00+0530
categories:
  - "imagemagick"
  - "til"
---

I recently had some images where I had to crop to its main content and get rid of everything else. While I was doing it on icons with transparent backgrounds, it is easier to show on an image with a coloured background. The command to trim the image is:

```shell
magick input.png -trim trimmed.png
```

<figure>
  <img
    alt="Full sized image"
    src="../assets/images/posts/til-trim-png-background/full-image.png"
    style="width: fit-content; height: fit-content;" />
  <figcaption style="text-align: center;">Image by <a href="https://pixabay.com/users/haninabz-24628630">Hanin Abouzeid</a> from <a href="https://pixabay.com">Pixabay</a></figcaption>
</figure>

<figure>
  <img
    alt="Image cropped/trimmed using ImageMagick"
    src="../assets/images/posts/til-trim-png-background/cropped-image.png"
    style="width: fit-content; height: fit-content;" />
  <figcaption style="text-align: center;">Image cropped/trimmed using ImageMagick</figcaption>
</figure>

### References

1. ImageMagick documentation: [https://imagemagick.org/script/command-line-options.php#trim](https://imagemagick.org/script/command-line-options.php#trim)
