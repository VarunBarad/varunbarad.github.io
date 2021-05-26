---
layout: post
title: "📝 Opening current terminal command in $EDITOR"
summary: "TIL: Ctrl+X followed by Ctrl+E opens the command you are currently editing in your $EDITOR program"
date: 2021-05-26 00:00:00 +0530
categories:
  - "til"
---

If you are working with a long command in your terminal and want to edit parts of it, `Ctrl+X` followed by a `Ctrl+E` (don't lift your finger from `Ctrl` between them) will open the command you are currently editing into the program specified in your `$EDITOR` environment variable. Tested on zsh and heard that it works on bash too.

Thanks to my colleague [msfjarvis](https://msfjarvis.dev) for this tip.
