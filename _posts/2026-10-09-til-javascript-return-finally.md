---
tags:
  - post
layout: post
title: "📝 <code>finally</code> runs before <code>return</code>"
summary: "The <code>finally</code> in a <code>try-catch</code> block always runs before returning from a function"
date: 2026-10-09T18:18:00+0530
categories:
  - "javascript"
  - "programming"
  - "til"
---

If you have a `return` statement somewhere within your `try` or `catch` block inside a function. It will still execute the `finally` block of that try-catch group before actually returning from the function.

I recently encountered this pattern when working with Claude where it was closing a database connection in the `finally` block, even though it was returning a value from the `try` block. I thought this would leave dangling database connections, but turns out that is not the case.

Take this function as an example:

```javascript
const getUserName = (userId) => {
    console.log('Entered function body');
    try {
        console.log('Entered try block');
        if (typeof userId === 'string') {
            console.log('Entered a string userId');
            throw `${userId} is not a valid userId`;
        } else {
            console.log('Returning username');
            return `username-${userId}`;
        }
    } catch (e) {
        console.log('Entered catch block. Caught:', e);
        return 'nope';
    } finally {
        console.log('Entered finally block');
    }
};
```

When returning from the `try` block:

```javascript
console.log('Value returned from function:', getUserName(123));
// The above function call prints these logs
// Entered function body
// Entered try block
// Returning username
// Entered finally block
// Value returned from function: username-123
```

When returning from the `catch` block:

```javascript
// Returning from the `catch` block
console.log('Value returned from function:', getUserName('blah'));
// The above function call prints these logs
// Entered function body
// Entered try block
// Entered a string userId
// Entered catch block. Caught: blah is not a valid userId
// Entered finally block
// Value returned from function: nope
```
