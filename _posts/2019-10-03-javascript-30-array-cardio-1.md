---
layout: post
title:  "JavaScript 30 - Array Cardio 1"
summary: "Day 4 of JS30 challenge, today we worked with various methods on array and I learned one nifty trick of displaying them in console."
date:   2019-10-03 12:00:00 +0530
categories:
  - "programming"
  - "web"
  - "javascript-30"
---

Day 4 of [JS30 challenge][js30-website], today I worked with various methods on array (I knew most of them beforehand) but I learned two cool things today.

The key concepts I learned from today's challenge were:

- Converting iterables to array in JS.
- Displaying array of objects nicely formatted in console.

## Converting iterables to array in JS

As you might have observed that `document.querySelectorAll` doesn't return us an actual `Array` but instead it returns us what is called as a `NodeList`. Consequently `NodeList` doesn't have all the methods that an `Array` does (like `map`, `filter`, `reduce` etc).

`NodeList` is an example of what we call as "iterable" in JS. So whenever working with iterables we tend to prefer to convert them to an actual `Array` so that we have more options to work with.

I already knew of one way to convert them:

```javascript
const anyIterable = document.querySelectorAll('a');
const convertedArray = Array.from(anyIterable);
```

Here we used the `Array.from` method to convert the iterable to an `Array`.

The other way I learned today was:

```javascript
const anyIterable = document.querySelectorAll('a');
const convertedArray = [...anyIterable];
```

Here we made use of a combination of 2 things:

#### 1. ES6 spread operator `...`
When we prepend an iterable with `...` (called the ES6 spread operator) what it does is it extracts all values from that iterable and replaces the `...anyIterable` part of the expression with those values.
#### 2. Array literal `[]`
Then when we enclose the "spreaded" values with `[` and `]` it converts the whole thing into an array containing all the values from that iterable.

Both produce the same result. I don't know if one performs better than the other under large data-sets. But even though the `[...anyIterable]` way is more concise, to me the `Array.from(anyIterable)` usage seems more readable.

## Conclusion

That's all folks, that was it for today. If you have anything unclear in this article or want to discuss anything else, hit me up on twitter [@varun_barad][varun-twitter].

[js30-website]: https://javascript30.com
[varun-twitter]: https://twitter.com/varun_barad
