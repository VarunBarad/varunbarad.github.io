---
tags:
  - post
layout: post
title: "📝 Scroll a page to an element using <code>scrollIntoView()</code>"
summary: "If you want to scroll a page to a particular element using JavaScript, you can call <code>element.scrollIntoView()</code>"
date: 2026-02-08T16:56:51+0530
categories:
  - "javascript"
  - "til"
  - "web"
---

I was recently making a vertical accordion style component and had to have this interaction pattern:

1. User is presented with a list of clickable items
2. User clicks an item
3. Expand the children of the selected item
4. Scroll the page/container so that the selected item comes at the top of the page

This had to be done so that in case the children expand outside the visible area, then the user does not get confused that nothing opened at all.

I only knew originally of [`element.scrollTo`][doc_scrollTo] method, but [Prasad Nagthane on StackOverflow][stackOverflowAnswer] pointed me to [`element.scrollIntoView()`][doc_scrollIntoView]

```javascript
const element = document.getElementById('elementToShowAtTop');
element.scrollIntoView();
```

This gives me the benefit that I don't have to keep track of which element is the scroll container. If we want to use the `scrollTo` method then we need to apply it to the scroll container rather than the actual element which we want to show.

Another advantage is that `scrollIntoView` gives much more control on how and where to position the element within the scroll container. You can choose to align it with the top or the bottom or a couple of other options. Do look into its documentation.

[doc_scrollTo]: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
[stackOverflowAnswer]: https://stackoverflow.com/a/78092566/4717436
[doc_scrollIntoView]: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
