---
layout: post
title: "Contacts Calendar"
summary: "A website which lets you export a calendar of important dates from your Google Contacts"
date: 2023-03-04 17:18:03 +0530
categories:
  - "web"
  - "programming"
  - "project"
---

I store birthdays of my contacts right in my contacts application on phone. They get synced to Google Contacts.

The drawback to that is I didn't get notified of any upcoming birthdays. Google does show this in your calendar, but I don't use my Google calendar as my day-to-day calendar.

So I decided to build a service of my own which would let me export these into separate calendar feeds. You can go to [Contacts Calendar](https://contacts-calendar.varunbarad.com) to try it out for yourself.

Keeping user's privacy in mind, this project does not store authentication token for your Google account, nor does it store your contacts data. It even gives you the calendar feed file and does not directly host it on the web.  That also allowed me to side-step thinking about maintaining user accounts and data.

I used this also as an opportunity to learn the basics of Spring Boot framework using Kotlin.

Check it out and let me know what you like and what you would like to change about it. At the very least, have fun.
