---
layout: simple-page.liquid
title: Ideas
permalink: "/ideas.html"
redirect_from: [
  "/ideas/index.html",
]
---

I have realized that there are a lot more ideas (for things to do or make) in my head than I can remember or hope to execute upon. So this is just a holding pen for now of all the ideas that I can someday build upon. I would be glad if you like something from this and decide to build it yourself. Do let me know if you do so, it would be fun to discuss these with someone else 🙂

---

## Bathroom Emergency

Install switches in bathrooms that when pressed would raise an alarm throughout the house. This is to indicate that
someone needs help in one of the bathrooms. This becomes especially useful at nighttime because then people are in their
own rooms and if someone hasn't got their phone in the bathroom when they fall, it would be extremely unlikely that it
is noticed.

These would ideally operate on more efficient hardware than an RPi because that would make deploying them and powering
them with AA cells a much more achievable and long-lasting task.

---

## Browser plugin to redirect YT Shorts to Regular YT Player

The video player used for YT Shorts doesn't have most of the playback controls like seek, volume, mute etc. But those
videos can be played in the regular YT player by just replacing the url path.

- Shorts player URL scheme: `https://youtube.com/shorts/<video-id>`
- Regular player URL scheme: `https://youtube.com/watch?v=<video-id>`

Note (2023-03-23): This won't work anymore as now when YT detects the video-id to belong to a Shorts video, it redirects
the regular player to the Shorts player.

---

## Google Contacts Birthday Calendar

Note: Eventually I made it and now it is [live on the interwebs](https://contacts-calendar.varunbarad.com) (the server
is on a free tier so give it a few mins to load).

Google Contacts does have the birthdays of many people in your circles, but it doesn't expose those birthdays as a
calendar feed which can be consumed from other calendar applications. So this will connect with Google Contacts and
expose an iCal feed that you can subscribe to from any calendar application of your choice.

---

## Hardware Conversation Starters

Based off of [Trust Invitation](https://trust.varunbarad.com) I want to build a physical manifestation of it. One
possible shape it could take is a LCD screen and a button attached to an Arduino which will show one random prompt on
the screen each time the button is pressed.

---

## Jack Sparrow's Compass

The idea is to have a servo-motor driven compass which points us to the destination that we have selected in the
companion app. It doesn't point us to which route we should take but just generally which direction our destination is
in. First version can be just an Android app showing a compass needle pointing towards our destination.

---

## Keyboard with integrated password manager

Many websites (such as banking) don't allow you to copy-paste your passwords. It would be awesome to have a keyboard
which can send out HID signals for your password so that it appears as if you are typing the password instead of
copy-pasting. Perfect bypass for every such shitty detection algorithms.

---

## Morse-Code Keyboard

We can hook up a typical morse-code key to a microcontroller like an ESP32 and then connect that to a computer. We can
connect to the computer as an HID and then send keystrokes to the computer based on the morse code entered.

---

## Random Book Box

Recently I have seen a lot of online booksellers here offer something along the lines of a "Random Book Box" in which
they would select `x` number of random books from their inventory and package it for you.

Those are the parts I like about the idea but what I don't like is that generally these are sellers of used books and
their inventory consists mostly of titles that I've never heard before and that I won't actually care about reading.

My idea is basically to build something to which I can tell about what books I want to read and what books some of my
friends suggest, then it can build me a box out of those which then a friend can order for me. Similarly, I can be one
of the friends who makes such a random book box for one of my friends.
