---
tags:
  - post
layout: post
title: "📝 Get image file info using imagemagick"
summary: "TIL: How to get information about/from an image"
date: 2025-12-09T12:13:03+0530
categories:
  - "til"
  - "imagemagick"
---

I am trying to make an automated workflow for any documents I scan and needed to have a step in there where I figure out the existing dimensions and scaling of the image. I looked into how to fetch that info using imagemagick. The `identify` sub-command is the one we need.

```shell
# Assuming our image file is called input.jpg
magick identify input.jpg
```

If we want all information then we can use the `-verbose` flag.

```shell
magick identify -verbose input.jpg
```

I only needed five pieces of info, so I went with the `-format` flag:

```shell
magick identify -format "%m %w %h %x %%y" input.jpg
# This gives an output like below
# JPEG 4960 7015 600 600
```

- `%m`: Format of the image file (`JPEG`, `PNG`, `WEBP`, etc.)
- `%w`: Width of the image (in pixels)
- `%h`: Height of the image (in pixels)
- `%x`: Resolution/Density in the x direction
- `%y`: Resolution/Density in the y direction

You can find all the available attributes [here](https://imagemagick.org/script/escape.php).
