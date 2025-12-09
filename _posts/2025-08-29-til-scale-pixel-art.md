---
tags:
  - post
layout: post
title: "📝 Pixel art images should be scaled and not resized"
summary: "TIL: Why pixel art images should be scaled and how to do it with imagemagick"
date: 2025-08-29T10:30:01+0530
categories:
  - "til"
  - "blaugust-2025"
  - "imagemagick"
---

This week I wanted to turn a 512x512 pixel image down to a 128x128 sized image. A noteworthy point is that this image was a pixel-art, and thus we needed to keep the edges sharp. Below is the image in question:

<figure>
  <img
    alt="Full sized badge image"
    src="../assets/images/posts/til-scale-pixel-art/badge-full.webp"
    style="width: fit-content; height: fit-content;" />
  <figcaption style="text-align: center;">Full sized badge image</figcaption>
</figure>

I brought out the trusty old imagemagick and resized it:

```shell
magick convert badge-full.webp -resize 128x128 badge-resize.webp
```

That got me this image:

<figure>
  <img
    alt="Resized badge image"
    src="../assets/images/posts/til-scale-pixel-art/badge-resize.webp"
    style="width: fit-content; height: fit-content;" />
  <figcaption style="text-align: center;">Resized badge image</figcaption>
</figure>

If you were to open this new image and zoom in a bit, you will see that the edges of the pixels are not as sharply defined and there is a bit of color blending going on. We obviously don't want that.

Scaling to the rescue. We can scale the image like this:

```shell
magick convert badge-full.webp -scale 128x128 badge-scale.webp
```

That gives you the one you want, with clean and crisp borders:

<figure>
  <img
    alt="Scaled badge image"
    src="../assets/images/posts/til-scale-pixel-art/badge-scale.webp"
    style="width: fit-content; height: fit-content;" />
  <figcaption style="text-align: center;">Scaled badge image</figcaption>
</figure>

The relevant documentation page for [resize](https://usage.imagemagick.org/resize/#resize) and [scale](https://usage.imagemagick.org/resize/#scale).
