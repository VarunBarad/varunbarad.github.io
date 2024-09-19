---
tags:
  - post
layout: post
title: "📝 Google gives refresh token only once"
summary: "TIL: Google doesn't return refresh token on subsequent authentication after the first one."
date: 2021-05-06T00:00:00+0530
categories:
  - "til"
---

According to Google's [docs on OAuth](https://developers.google.com/identity/protocols/oauth2/web-server), the server application gets `refresh_token` from Google (on exchanging the auth code) only if the original redirection request to Google contains the param `access_type` with value `offline` ([documentation link](https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient)).

But this is only for the first time a user authenticates with your app. If for some reason your flow takes the user through the authentication flow again without having changed anything (user's Google account, permissions required, etc. Haven't tested with changed permissions yet but definitely happens when permissions also remain the same) then when you exchange auth code for tokens from Google, the Google servers don't return the `refresh_token` this second time.

This is based on anecdotal observation, and I couldn't find any such mention in their documentation. An [answer on Stack Overflow](https://stackoverflow.com/questions/10827920/not-receiving-google-oauth-refresh-token/10857806#10857806) confirmed for me that it wasn't something misconfigured on my end 😅.

A "solution" for this could be to always specify the param `prompt` with a value of `consent` in the original redirect request where we send user to Google's flow.
