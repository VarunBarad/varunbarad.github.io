---
tags:
  - post
layout: post
title: "📝 Save dependency list of your python project to a file"
summary: "TIL: How to do for python what we get with `dependencies` in npm `package.json`"
date: 2023-05-22T16:10:27+0530
categories:
  - "til"
  - "python"
  - "programming"
---

Node/npm lists the dependencies you install in a project in the `dependencies` key in your `package.json` file. But since python doesn't have a similar file I was exploring how to do the same for a python project.

I came across the convention of a `requirements.txt` file. This file lists all the packages that are installed in your current environment.

To generate the file you use:

```shell
pip freeze > requirements.txt
```
