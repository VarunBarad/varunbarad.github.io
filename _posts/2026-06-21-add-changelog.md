---
tags:
  - post
layout: post
title:  "Logging the changes"
summary: "I added a changelog for my website."
date: 2026-06-21T11:13:57+0530
categories: 
  - "meta"
---

Nearly a year ago in [August I had mentioned](/blog/blog-questions-challenge-2025.html#:~:text=A%20simple%20changelog%20based%20on%20Keep%20a%20Changelog) that the next things I want to add to my website are a changelog and a redesign. The redesign got done in December but it took me till today to add the [changelog](/changelog) that I so wanted to add. It can be accessed either by going directly to [https://varunbarad.com/changelog](https://varunbarad.com/changelog) or from the footer on any page.

The format is simple, each log starts with one of six tags: Added, Changed, Deprecated, Removed, Fixed, Security (I don't see needing the Security tag in this website). All the logs for each release get grouped under that release's version number. Since this is a personal website, I would be grouping all changes under the date that they were released on.

As an example, here's what the current changelog looks like:

```markdown
### 2026-06-21

- [Changed] Simplified the code of Ideas page
- [Added] Added a changelog based on keepachangelog.com format

### 2026-06-19

- [Changed] Generalized anchor style code across the website
```

While I am not going to retroactively dig through my commit history to populate this document, I would be trying my best to keep it updated going forward. You can expect to see the next update (hopefully the [/now](https://nownownow.com) page) show up both on the website and in the changelog soon.
