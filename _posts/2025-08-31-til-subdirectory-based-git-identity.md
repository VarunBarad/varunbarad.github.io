---
tags:
  - post
layout: post
title: "📝 Set git identity based on project-directory"
summary: "TIL: How to set the author identity in git for all projects under a single parent directory"
date: 2025-08-31T02:00:29+0530
categories:
  - "til"
  - "blaugust-2025"
  - "programming"
---

I am done looking this up online every time I think of doing this. This time I am writing the canonical (for me) guide on how to do this. My sincerest gratitude to the original author ([Shirish Padalkar's post](https://www.shirishpadalkar.com/using-separate-git-identities-on-the-same-machine/)) whose guide I followed this time.

The premise is that we have multiple identities for various projects that we work on. Let's say I work as a consultant with two companies Frame and Clock, and this is how I organise my projects:

```text
Projects
├── all-other-projects-go-here
├── clock
│   └── projects-for-Clock-stay-here
└── frame
    └── projects-for-Frame-stay-here
```

And these are the identities I need to be using in these projects:

- Projects for Frame: varun@frame.com
- Projects for Clock: varun@clock.com
- Everything else: varun@varunbarad.com

The way to solve this is to have three config files for git; a base/global config and then two additional files which are decided (based on the repo-root) whether to import or not.

```
# ~/.gitconfig-frame

[user]
    name = Varun Barad
    email = varun@frame.com
```

```
# ~/.gitconfig-clock

[user]
    name = Varun Barad
    email = varun@clock.com
```

The above are our files to set the appropriate identity. Now we need to tell our global gitconfig to import either of these two files when in the correct directory.

```
# ~/.gitconfig

[user]
    name = Varun Barad
    email = varun@varunbarad.com

[includeIf "gitdir:~/Projects/frame"]
    path: .gitconfig-frame

[includeIf "gitdir:~/Projects/clock"]
    path: .gitconfig-clock
```

And that's how it's done. That's all folks. Now wherever you create your repo, appropriate author information is applied based on where the repo was created.
