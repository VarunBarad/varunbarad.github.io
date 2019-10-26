---
layout: post
title: "Record Linux terminal session"
summary: "How to record your linux terminal session to work on later."
date: 2019-10-26 12:00:00 +0530
categories:
  - "programming"
---

I was recently setting up my computer with Ubuntu on it and this time I was decided that I would document every step of the process so that I can get it done faster the next time. That thought and process worked easily for the programs whose installations were just a simple `sudo apt install ...` but when I was installing something new (like VS Code) there were many steps involved and it wasn't an easy task to document them as I went on installing those things.

What I decided to then do was to just record my terminal sessions for each such long program and review those recordings later to write a script for everything that I needed to do.

Linux has a handy utility called `script` which does just that. If it isn't pre-installed then you can easily install it with `sudo apt install script` as it is generally available in the default PPA.

Using it is straight-forward too.

```shell
script <file_name_to_write_record_to>
```

I also find these options to be of significance:

- `-a, --append`: This appends the recording if the file is already existing.
- `-c, --command <command_which_is_to_be_recorded>`: If you want to record the interaction of a program with terminal then you can use this.

I found this command to be quite helpful in my recent endeavour of documenting the setup process and think it might others too. Want to discuss this or any other interesting thing, hit me up on Twitter [@varun_barad][varun-twitter]

[varun-twitter]: https://twitter.com/varun_barad
