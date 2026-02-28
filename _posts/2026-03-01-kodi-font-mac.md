---
tags:
  - post
layout: post
title: "How to change the font in Kodi media player installed on a Mac"
summary: "How to set a font for Kodi media player (on a Mac) that properly shows देवनागरी (Devanagri) characters"
date: 2026-03-01T01:57:39+0530
categories:
  - "miscellaneous"
---

The Kodi media player doesn't fare well in displaying non-latin characters in the default font of its default skin. We have to supply a font which can display Unicode characters properly (especially देवनागरी characters in my case).

First of all, huge thanks to ["linesma"](https://forum.jellyfin.org/u-linesma) over on Jellyfin Forum for [their detailed explanation](https://forum.jellyfin.org/t-changing-the-default-font-in-kodi-to-display-unicode-characters) of this.

The only problem is that the above guide covers how to do it on other platforms, but I am using a Mac. Therefore file-destinations change a bit.

1. From the above guide, ensure that your font file is named `arial.ttf`
2. Copy that `arial.ttf` to `~/Library/Application Support/Kodi/fonts/` directory
3. Now you can go to Kodi and change the font used to be "Arial based"

Here's a small before-and-after:

<figure>
  <img
    alt="Kodi trying to show a देवनागरी movie title with its default font"
    src="/assets/images/posts/kodi-font-mac/before.webp"
    style="width: fit-content; height: fit-content;" />
  <figcaption style="text-align: center;">Kodi trying to show a देवनागरी movie title with its default font</figcaption>
</figure>

<figure>
  <img
    alt="Kodi successfully rendering देवनागरी movie title after updating the font"
    src="/assets/images/posts/kodi-font-mac/after.webp"
    style="width: fit-content; height: fit-content;" />
  <figcaption style="text-align: center;">Kodi successfully rendering देवनागरी movie title after updating the font</figcaption>
</figure>
