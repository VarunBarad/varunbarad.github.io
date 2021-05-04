---
layout: post
title: "📝 JavaScript can \"throw\" the table"
summary: "TIL: JavaScript can throw anything"
date: 2021-05-04 12:00:00 +0530
categories:
  - "til"
---

Since JavaScript does not have the concept of a throwable type. Therefore you can throw anything in JavaScript.

```javascript
try {
  throw "the table";
  console.log("stable table")
} catch (err) {
  console.log(err);
}
```

The above code would produce `the table` in console logs and not `stable table`.
