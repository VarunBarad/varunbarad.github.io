---
layout: post
title: "Cheatsheet - Git"
summary: "A cheat-sheet for git CLI"
date: 2020-12-07 00:00:00 +0530
categories:
  - "cheat-sheet"
---

This is first in my collection of cheat-sheets. This is here as a blog post until I figure out how to have a separate section just for cheat-sheets and not make them show up in posts, and then find time to implement it. Till then here it is and here it will be updated as and when need arises 🙃

## Show change-history of a file

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

## Automatically rearrange fixup commits to their appropriate positions when rebasing

```shell
git rebase --interactive <commit-hash> --autosquash
```

## Find which files have had the most commits

```shell
git log --all -M -C --name-only --format='format:' "$@" | sort | grep -v '^$' | uniq -c | sort -n | awk 'BEGIN {print "count\tfile"} {print $1 "\t" $2}' | tail -10
```

## Create an empty commit

```shell
git commit --allow-empty -m "Commit message goes here"
```

## List files in a commit

```shell
git show --pretty="" --name-only <sha1-commit-hash>
```

## Reset a branch head to a specific commit

```shell
git checkout <branch-name>
git reset --hard <commit-hash>
```

Reference: [stackoverflow](https://stackoverflow.com/a/7310222/4717436)

## Make git forget a tracked file

Let's suppose we want to remove `file.log` from git tracking but keep it in the file system.

1. Add `file.log` to `.gitignore`
2. Commit `.gitignore` changes
3. Execute the command `git rm --cached file.log`
4. Commit the removal of `file.log` from git.

Have a great day people 👋
