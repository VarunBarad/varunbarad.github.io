---
tags:
  - post
layout: post
title: "📝 Serve local sites over HTTPS connections"
summary: "TIL: How to serve your local website over HTTPS"
date: 2025-08-24T13:08:17+0530
categories:
  - "til"
  - "blaugust-2025"
---

Let's say you are building a website and testing it locally, assume it is on `localhost:8080`. Now if you were to visit that URL in a browser, it would take you to `http://localhost:8080`. And it won't work if you tried using the HTTPS protocol as you don't have a proper SSL/TLS certificate. But we can use the [Caddy](https://caddyserver.com/) server to serve a site over HTTPS.

We will need to use a hostname because it's easier to get SSL/TLS cert for a domain than an IP address. We will use `garden.varun` domain because I am pretty sure `.varun` is not going to be a TLD ever and thus no chances of clashes with actual domains.

## Installing and configuring Caddy

You can install Caddy using Homebrew on macOS with `brew install caddy` (please look up the specific steps if you are using a different OS). After that in your project directory (or working directory, your choice) create a file named `Caddyfile` with these contents:

```caddyfile
{
    local_certs
}

garden.varun {
    reverse_proxy 127.0.0.1:8080
}
```

## Pointing garden.varun to our own computer

Next we need to modify our computer's hosts file (in Mac or Linux it is situated at `/etc/hosts`) to tell it to point `garden.varun` to `127.0.0.1`. We would need to add the below record at the bottom of the existing file's contents:

```text
127.0.0.1   garden.varun
```

You might need to use admin privileges to update the `/etc/hosts` file.

## Firing up caddy

Next, start the caddy server using the command `caddy run` and you should be good to go. Visit `https://garden.varun` in your browser and it should show you the website/whatever served on your local `8080` port with an HTTPS connection.
