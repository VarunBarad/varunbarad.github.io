---
tags:
  - post
layout: post
title: "📝 Specifying different author and committer in git"
summary: "TIL: How to specify different author and committer for a commit in git"
date: 2024-12-18T23:13:33+0530
categories:
  - "til"
---

In some cases you need to commit code/work that is originally written/done by someone else. For example when you are amending/rebasing a commit to change a small thing but still want to retain the attribution to original author when committing you can specify separate committer and author information.

This is not done via any flag but by specifying a couple of environment variables.

```shell
# Committer Name: Sam Smith
# Committer Email: ss@example.com
# Author Name: Jake Johnson
# Author Email: jj@example.com
GIT_COMMITTER_NAME='Sam Smith' GIT_COMMITTER_EMAIL='ss@example.com' git commit --author 'Jake Johnson <jj@example.com>'
```

Credits: [StackOverflow](https://stackoverflow.com/a/23108169/4717436)
