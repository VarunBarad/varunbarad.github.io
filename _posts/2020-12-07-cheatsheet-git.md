---
layout: post
title: "Cheatsheet - Git"
summary: "A cheat-sheet for git CLI"
date: 2020-12-07 00:00:00 +0530
categories:
  - "cheat-sheet"
---

This is first in my collection of cheat-sheets. This is here as a blog post until I figure out how to have a separate section just for cheat-sheets and not make them show up in posts, and then find time to implement it. Till then here it is and here it will be updated as and when need arises 🙃

## Change history of a file

History of commits where this file was changed. This only gives the commits where it was changed (not the file-diff for those commits)

```shell
git log -- <file>
```

History of commits with file-diff

```shell
git log -p -- <file>
```

History of commits with file-diff tracked across renames

```shell
git log --follow -p -- <file>
```

Have a great day people 👋
