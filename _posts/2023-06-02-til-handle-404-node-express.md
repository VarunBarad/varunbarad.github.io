---
tags:
  - post
layout: post
title: "📝 Custom 404 in Express"
summary: "TIL: How to return custom response for a 404 in Express on NodeJS"
date: 2023-06-02T17:52:02+0530
categories:
  - "til"
  - "programming"
  - "javascript"
---

You need to define a middleware to handle it and that middleware needs to be defined after all the other routes and middlewares have been specified already.

The logic is that this middleware will only be executed if the request cannot match with any other middleware/route.

```javascript
app.use((req, res, next) => {
  res.status(404).send("Not found");
});
```

And if you don't want to provide a body then.

```javascript
app.use((req, res, next) => {
  res.sendStatus(404);
});
```
