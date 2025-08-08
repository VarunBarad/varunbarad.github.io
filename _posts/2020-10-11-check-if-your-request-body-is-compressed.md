---
tags:
  - post
layout: post
title: "Check if your request body is compressed"
summary: "Make sure to know what is the default request body compression setting in your http library is"
date: 2020-10-11T00:00:00+0530
categories:
  - "programming"
---

## Entering the maze

Recently in one of the projects I was trying to make a POST request to an external API. This was my first time using Jersey http client and so when the server responded with an error saying `could not find required parameter "code"` I thought there must be something wrong going on with how I was making the request.

I spent 2 hours on this and even roped in 2 of my senior colleagues into figuring out how to send a simple POST request with a form-encoded request body. We tried all methods listed in the docs. The same way would work with some other API but not with the one we wanted to integrate with.

## Convolutions by miscommunication

The most confusing part was that the errors it threw didn't make much sense, since even the errors didn't align with what we expected them to be. We needed to pass 4 parameters and here's what some of the errors we found out were:

- Included all 4 parameters. Error: `could not find required parameter "code"`
- Supplied only the `code` parameter. Error: `illegal arguments`
- Started adding all the 4 parameters one-by-one. Error: `illegal arguments`
- As soon as we reached all 4 parameters. Error: `could not find required parameter "code"`
- Removed one of the parameters at random. Error: `could not find required parameters "code"`
- Included all 4 parameters but changed the __value__ of `code`. Error: `illegal arguments`

## The ray of hope

This was so bizarre that all 3 of us were confused with the behavior. Then one of the colleagues added a logger to the jersey client and figured out that the request body was getting compressed with gzip. It is a standard practice to compress API responses with gzip but this was the first time I encountered a __request__ body getting compressed.

We configured jersey to disable gzip compression for requests and finally the API could understand what we were trying to speak to it. Phew.

## Summary

When an API says it can't read what you are sending it and you are confident that you are sending it the data as it requested then first thing you should check is whether your request body is getting compressed or not and whether the API supports taking in gzipped requests.

Found this confusing maze interesting and have something of yours to share (or even if you just wanna talk) then you have my standing invitation to get in touch with me over [@varun_barad](https://twitter.com/varun_barad) on Twitter.
