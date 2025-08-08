---
tags:
  - post
layout: post
title: "🐍 Packaging my first Python tool"
summary: "My experience of packaging my first Python tool"
date: 2024-04-21T07:57:19+0530
categories:
  - "programming"
  - "tools"
---

I want to make tools and scripts to simplify my work and make it easier.

## The first tool in the tool-belt

Amongst the many ideas I have in mind, I decided to start with one which would help me log what all I do during my work hours. So after summoning all my creative juices, I decided to name it `worklog`. This tool when invoked, takes a text input from the user and logs an entry to a CSV file along with the current timestamp. Below is the code for its first version (can totally be ignored for this post):

```python
#!/usr/bin/env python3


import csv
import datetime


def main():
    worklog_file = '/Users/varunb/worklog.csv'

    worklog_entries = []
    with open(worklog_file, 'r', newline='') as csvFile:
        reader = csv.DictReader(csvFile)
        worklog_entries.extend(reader)

    print('Enter the new worklog entry')
    new_entry = input()

    now = datetime.datetime.now()
    formatted_now = now.strftime('%Y-%m-%dT%H:%M+05:30')

    worklog_entries.append({
        'timestamp': formatted_now,
        'contents': new_entry,
    })

    with open(worklog_file, 'w', newline='') as csvFile:
        headers = ['timestamp', 'contents']
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        writer.writerows(worklog_entries)

    print('{} Worklog updated!'.format(now.strftime('%H:%M')))


if __name__ == '__main__':
    main()
```

My directory structure of the project at this moment was:

```text
worklog/
└── src/
    └── main.py
```

## Running worklog

Whenever I wanted to, I ran the script by specifying its full path in the terminal like `/Users/varunb/Projects/worklog/src/main.py`. Since currently the script does not have any dependencies on external libraries, this approach worked fine. But I wanted to have a setup where I could run it from anywhere on my system and neither have to worry about the full path to the script, nor have to have the dependencies installed in the global Python environment. I knew it was possible to write command-line tools in Python that satisfied both of those requirements as [yt-dlp](https://github.com/yt-dlp/yt-dlp) is a Python based tool meeting both of those requirements. Looking around told me that I need to look for [`pipx`](https://pipx.pypa.io/).

## Packaging it

I initially started with the `setup.py` route as I found a [guide for it](https://python-packaging.readthedocs.io/en/latest/index.html) first, but then found that `pipx` has a different suggested way (using `pyproject.toml`) and they also provided a [guide for the same](https://setuptools.pypa.io/en/latest/userguide/quickstart.html).

My final directory structure looked like this:

```text
worklog/
├── pyproject.toml
└── src/
    └── worklog/
        └── __init__.py
```

With `pyproject.toml` looking like this:

```toml
[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"

[project]
name = "worklog"
description = "A simple log of my work"
version = "0.1"
authors = [
    { name = "Varun Barad", email = "contact@varunbarad.com" },
]
dependencies = []

[project.urls]
Homepage = "https://github.com/VarunBarad/worklog.git"

[project.scripts]
worklog = "worklog:main"
```

And `src/worklog/__init__.py` remaining mostly unchanged:

```python
import csv
import datetime


def main():
    worklog_file = '/Users/varunb/worklog.csv'

    worklog_entries = []
    with open(worklog_file, 'r', newline='') as csvFile:
        reader = csv.DictReader(csvFile)
        worklog_entries.extend(reader)

    print('Enter the new worklog entry')
    new_entry = input()

    now = datetime.datetime.now()
    formatted_now = now.strftime('%Y-%m-%dT%H:%M+05:30')

    worklog_entries.append({
        'timestamp': formatted_now,
        'contents': new_entry,
    })

    with open(worklog_file, 'w', newline='') as csvFile:
        headers = ['timestamp', 'contents']
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        writer.writerows(worklog_entries)

    print('{} Worklog updated!'.format(now.strftime('%H:%M')))
```

## Installing it

After all of this now I can do `pipx install /path/to/worklog/ worklog` and that would install my tool and make it available to run from anywhere on my system with a simple `worklog` command. This also takes care of creating a virtual-environment for the dependencies of this tool and installing them in there.
