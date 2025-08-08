---
tags:
  - post
layout: post
title: "📝 Authentication with wget"
summary: "TIL: How to provide username and password for simple authentication when downloading files using wget"
date: 2022-09-04T07:43:54+0530
categories:
  - "til"
---

There are 2 ways to provide username and password when downloading files using wget

## Directly as parameters

```shell
wget --user "<username-goes-here>" --password "<password-goes-here>" "<file-url-goes-here>"
```

This has the disadvantage that it will show up in your shell history and in running processes lists, thus exposing your password.

## Interactively entering the password

Another way is to tell wget to interactively ask you for the password

```shell
wget --user "<username-goes-here>" --ask-password "<file-url-goes-here>"
```

Here instead of the password showing up in your command, wget asks you to enter your password.
