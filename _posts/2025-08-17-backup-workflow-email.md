---
tags:
  - post
layout: post
title: "💾 My email backup workflow"
summary: "The why and how of my email backups"
date: 2025-08-17T12:11:13+0530
categories:
  - "backups"
  - "blaugust-2025"
---

I have previously serenaded about [why I consider email a critical service](./why-you-should-own-your-email-address). And for anything you consider critical, you should have a backup of/for it. I use [Fastmail](https://fastmail.com) as my email host, and this is my weekly workflow for backing it up:

- Fetch all the new emails over IMAP
- Compress the local mail store to `.zip` archive
- Store that archive file on my NAS

## Fetch emails from Fastmail to a local store

I use the program [Mailsync](https://sourceforge.net/projects/mailsync/) to download from Fastmail using the IMAP protocol. Here's my config and the command I use to run that backup:

```shell
mbsync --all --config /Users/varunb/.config/mailsync.rc
```

```shell
IMAPAccount fastmail
Host imap.fastmail.com
User contact@example.com
PassCmd "cat /Users/varunb/.secret/FASTMAIL_PASSWORD"
AuthMechs LOGIN
SSLType IMAPS
PipelineDepth 50

IMAPStore fastmail-remote
Account fastmail

MaildirStore fastmail-local
Path /Users/varunb/temp/fastmail/
Inbox /Users/varunb/temp/fastmail/Inbox
SubFolders Verbatim

Channel fastmail
Far :fastmail-remote:
Near :fastmail-local:
Patterns *
Create Near
Expunge Near
SyncState *
Sync Pull
```

Here, in line 4, you can see that instead of supplying the credentials for Fastmail directly in the config file, I use a separate file to store the password and use the `PassCmd` option to tell it how it can find the credentials.

## Compress the local store to a zip file

Once Mailsync finishes downloading the emails, I take the whole local store and compress it to a single timestamped `.zip` file with the highest compression ratio (speed does not matter here as much as space savings matters):

```shell
zip --recurse-paths --test --quiet -9 "/Users/varunb/temp/fastmail_2025-08-17_02-12-12.zip"
```

## Transfer the archive to NAS

I copy the archive to NAS using a simple `cp` command and if that is successful then we remove the local archive file. But I let the local mail store around as that reduces the amount of network transfer that has to take place the next time I run `mbsync`.
