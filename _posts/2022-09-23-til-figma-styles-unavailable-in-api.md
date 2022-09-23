---
layout: post
title: "📝 Figma styles not present in the API response"
summary: "TIL: Why Figma returns empty styles in API and how to fix it"
date: 2022-09-23 13:01:54 +0530
categories:
  - "til"
---

So there can be the case that your Figma file is showing that there are styles defined and present in the file, but when querying it via the API endpoint to get file-styles (`/v1/files/<file-id>/styles`) it might return empty styles array.

Simple fix is to go into the Figma file and Publish those styles (you can do it from the drop-down at the top by clicking file's name).

Now if you query that endpoint, you will find the published styles available there.

### Additional text just to help search-engines

- figma api styles empty
- figma api not returning styles
- no styles present in figma api
