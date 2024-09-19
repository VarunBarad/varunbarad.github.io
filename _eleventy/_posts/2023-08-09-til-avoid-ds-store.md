---
tags:
  - post
layout: post
title: "📝 Avoid .DS_Store files on removable media"
summary: "TIL: Settings change on Mac to avoid having .DS_Store files being created on USB and Network shares"
date: 2023-08-09T19:24:24+0530
categories:
  - "til"
---

Disable creation of metadata files (`.DS_Store` and AppleDouble files) on Network Volumes

```shell
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
```

Disable creation of metadata files (`.DS_Store` and AppleDouble files) on USB Volumes

```shell
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true
```
