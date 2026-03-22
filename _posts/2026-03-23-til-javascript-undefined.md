---
tags:
  - post
layout: post
title: "📝 \"undefined\" is not defined at the language level"
summary: "JavaScript's infamous <code>undefined</code> is not a language-level constant and can indeed be made to behave like a different value"
date: 2026-03-23T00:50:56+0530
categories:
  - "javascript"
  - "til"
---

Staying true to its name `undefined` is not a language-level value in JavaScript. It is instead defined as a read-only property on the global `window` object. The [Undefined type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#undefined_type) is defined in the language but only the `window.undefined` property is of that type.

Since the properties of `window` object are available globally, whenever we write `undefined` we are pointing to the `window.undefined` property. What this means is that even though the `window.undefined` is read-only and we cannot change what it means (duh, that's what read-only means), we can still shadow it by redefining `undefined` inside a closure.

## Case 1: Regular behavior

```javascript
const regularBehavior = () => {
  console.log('typeof undefined:', typeof undefined);
  console.log('undefined =', undefined);
};
regularBehavior();
```

Here we are just pointing to the top-level `window.undefined` property as we don't have any other property with the same name defined in our closure (the function `regularBehavior` in this case).

## Case 2: Local variable shadowing the `window` property

```javascript
const localVariable = () => {
  let undefined = 2;
  console.log('typeof undefined:', typeof undefined);
  console.log('typeof window.undefined:', typeof window.undefined);
  console.log('undefined =', undefined);
  console.log('Is undefined === 2:', undefined === 2);
};
localVariable();
```

Here we are defining a local variable with the name `undefined`, this makes it so that when we refer to `undefined` it refers to our local variable rather than going to the `window` level property. This is called [variable shadowing](https://en.wikipedia.org/wiki/Variable_shadowing) where a variable in a closer scope covers a similarly named variable in a further-out scope.

This might or mightn't be useful for anyone, but I found this to be weird that such a widely used language constant isn't actually a constant and can be made to give out different values instead.
