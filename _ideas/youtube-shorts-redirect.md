---
tags:
  - idea
title: "Browser plugin to redirect YT Shorts to Regular YT Player"
---

The video player used for YT Shorts doesn't have most of the playback controls like seek, volume, mute etc. But those videos can be played in the regular YT player by just replacing the url path.

Shorts player URL scheme: `https://youtube.com/shorts/<video-id>`
Regular player URL scheme: `https://youtube.com/watch?v=<video-id>`

Note (2023-03-23): This won't work anymore as now when YT detects the video-id to belong to a Shorts video, it redirects the regular player to the Shorts player.
