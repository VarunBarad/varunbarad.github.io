---
layout: post
title: "Sync git fork with upstream"
summary: "This is a simple guide on how to sync your fork of a git/github project with upstream changes."
date: 2019-10-25 12:00:00 +0530
redirect_from:
  - "/programming/2019/10/25/sync-git-fork-with-upstream.html"
categories:
  - "programming"
---

It is a common situation when we fork a project on Github and after some time we want to update our fork with the changes that have been integrated into the source project from where we forked. This is a simple guide on how to do that.

**Conditions:**

- We have the `remote` of source project added to our local git repo.
- The name of the source project remote is `upstream`.
- We are syncing changes from `upstream/master` to our local `master` branch.

Below are the steps I found on Github's guide.

1. Commit/Stash all your local changes.
2. Checkout your local `master` branch if not already there. `git checkout master`
3. Fetch (not pull) changes from `upstream`. `git fetch upstream`
4. Merge changes from `upstream/master` to local `master`. `git merge upstream/master`
5. Resolve merge-conflicts, if any.

And you are done. Your local `master` branch is now updated with changes from `upstream/master`.

Source: [Github guide](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)

**Tip:** Syncing like this will only update your local `master`. You will still need to push those synced changes to your Github repo if you want to update that too.

This was just a quick tip that I needed quite a lot recently and every time I had to go and search for that guide. So I wrote this to solidify the concepts in my mind. If you have any more such tips I would love to hear about them at this [@varun_barad][varun-twitter].

[varun-twitter]: https://twitter.com/varun_barad
