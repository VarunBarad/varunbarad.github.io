---
tags:
  - post
layout: post
title:  "Fixing Firefox's Face Flaws"
summary: "I fixed the annoyance of Firefox's homepage reverting to the Fedora project's start page."
date: 2026-09-14T00:33:57+0530
categories: 
  - "linux"
  - "repair"
---

I recently switched to Fedora and whenever my Firefox would update, it would start showing the ["Fedora Start"](https://start.fedoraproject.org) (from The Fedora Project) page as my default home/new-tab page. This was becoming very annoying but not so much that I would have actively hunted it a year or so ago. These days I am less inclined to take such paper-cuts and more driven towards getting it fixed, regardless of how hacky the fix is.

I found [someone on Reddit facing the same problem](https://www.reddit.com/r/Fedora/comments/1f00ta0/firefox_keeps_changing_back_to_fedora_start_as/) but also pointing out that someone suggested deleting a file which should fix it but doesn't actually fix anything in their case. [Someone else in the replies suggested](https://www.reddit.com/r/Fedora/comments/1f00ta0/comment/ljono10) that after every update Firefox checks some settings in its root preferences file (the same file the original poster was suggested to delete) and uses those if it didn't find the relevant settings values in user's own preferences' file.

```javascript
// This was the root preferences file for Firefox
// /usr/lib64/firefox/browser/defaults/preferences/firefox-redhat-default-prefs.js
/*
  A lot of unrelated preference settings
 */
pref("startup.homepage_override_url",       "");
pref("browser.startup.homepage",            "https://start.fedoraproject.org/");
pref("browser.newtabpage.pinned",           '[{"url":"https://start.fedoraproject.org/","title":"Fedora Project - Start Page"}]');
/*
  Some more unrelated preference settings
 */
```

My hypothesis is that when FF updates, the `startup.homepage_override_url` must be getting cleared away, and therefore it reads from the `browser.startup.homepage`. I am thinking of using `sed` to replace these three values at the start. That line with the key `"browser.startup.homepage"` seems to be the culprit here. A simple `sed` command should do the trick of replacing the value against that key with `""` (a blank URL).

Here are the sed commands to reset those values:

```shell
sed --in-place '/^pref("startup\.homepage_override_url",/c\pref("startup.homepage_override_url", "");' /usr/lib64/firefox/browser/defaults/preferences/firefox-redhat-default-prefs.js
sed --in-place '/^pref("browser\.startup\.homepage",/c\pref("browser.startup.homepage", "");' /usr/lib64/firefox/browser/defaults/preferences/firefox-redhat-default-prefs.js
sed --in-place '/^pref("browser\.newtabpage\.pinned",/c\pref("browser.newtabpage.pinned", "[]");' /usr/lib64/firefox/browser/defaults/preferences/firefox-redhat-default-prefs.js
```

Running these commands once would set the appropriate values in the prefs-file. But I wanted to make sure that a subsequent Firefox (or any other) upgrade wouldn't cause these to go back.

Turns out [DNF5](https://github.com/rpm-software-management/dnf5) (current version of the DNF package manager) already comes with a good plugins system and a pre-made Actions plugin which allows us to run scripts at different DNF events. I created [a small script](https://github.com/VarunBarad/dot-files/commit/e99e35c4c1065e43cbfd1541b79f289c8c88ff17) which would run these above sed command after every install/upgrade/other-relevant-events.

## References

- [DNF5 Actions plugin documentation](https://dnf5.readthedocs.io/en/latest/libdnf5_plugins/actions.8.html)