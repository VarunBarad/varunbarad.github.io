---
tags:
  - post
layout: post
title: "🖨️ My scribe writes my documents out in the physical world"
summary: "My trusty HP LaserJet 1020 now can print over network"
date: 2025-08-13T11:59:13+0530
categories:
  - "scribe"
  - "blaugust-2025"
---

More than a decade ago was when I first learned of network connected printers and then when I learned that we can turn a local-only printer into a networked printer just by using a Raspberry Pi I jumped into the pool to try it. I had a HP LaserJet 1020 (which I still have) which works flawlessly when using over a local USB connection from a Windows machine which I wanted to be able to use over network.

When I first tried that back around 2014-2015 I learned that the particular printer I had was not directly supported by [CUPS](https://en.wikipedia.org/wiki/CUPS). So I had to leave it there. Sometime near the end of last year I came across [an article](https://tripad.medium.com/turning-my-old-printer-into-a-wireless-printer-with-a-raspberry-pi-1fb6d73e35a4) where the author had achieved exactly what I strived to all those years ago. That is when I found out that CUPS can be extended to add support for these printers.

I knew things weren't going to work perfectly the first time and even if they did, I wanted to be able to reproduce it for multiple other such printers that my dad has (a Pi will be deployed at each one). So I went through the article step-by-step and turned all the required steps into a script which I can run on a newly flashed card containing Raspbian OS. You can see the script [here](https://github.com/VarunBarad/scribe).

And it works. I tested it by printing from a Mac, an Android phone, even an iPhone and it does print from all those devices. I then connected it through a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) and was able to print over the internet from outside my local network.

Now, there are a few hiccups which would need to be ironed out before I can use this as my full-time printer setup.

First and the most annoying, it takes a very long time between hitting "Print" and it actually starting the print. My suspicion is that both the network transfer as well as processing the document on a Pi might be the cause.

The second one I don't hit as frequently is that it can't handle double-sided printing as well as HP's proprietary driver handles on Windows. Not sure if there is a solution for this or not but will try looking around.

And the easiest to fix one is that the script currently depends on two external resources ([first](https://github.com/koenkooi/foo2zjs) and [second](https://www.quirinux.org/printers/sihp1020.tar.gz)) which I will eventually bring in-house (just a local mirror should do the trick) to avoid them being rug-pulled.
