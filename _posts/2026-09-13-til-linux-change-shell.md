---
tags:
  - post
layout: post
title: "📝 Change default shell in Linux"
summary: "You need to use the <code>chsh</code> to change your default system shell in Linux"
date: 2026-09-13T01:18:00+0530
categories:
  - "linux"
  - "programming"
  - "til"
---

On Fedora Linux you start with `bash` as your default shell. I prefer using `zsh` so I needed to change the default shell.

We need to use the `chsh` command to change that.

```shell
chsh --shell $(which zsh)
```

Instead of the full `--shell` option you can even use the shorthand `-s` (I prefer to use the full versions for easier understanding).

Thanks to these blog posts for guiding me:

- [Linux Handbook](https://linuxhandbook.com/change-shell-linux/)
- [It's FOSS](https://itsfoss.com/linux-change-default-shell/)
